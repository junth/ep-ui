import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  memo,
  useCallback,
  ChangeEvent,
  useMemo,
} from 'react'
import dynamic from 'next/dynamic'
import {
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Center,
  Skeleton,
  useToast,
  Box,
  HStack,
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from '@chakra-ui/react'
import {
  getRunningOperationPromises,
  getWiki,
  postWiki,
  useGetWikiQuery,
} from '@/services/wikis'
import { useRouter } from 'next/router'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import { skipToken } from '@reduxjs/toolkit/query'
import { useAccount, useSignTypedData, useWaitForTransaction } from 'wagmi'
import { MdTitle } from 'react-icons/md'
import slugify from 'slugify'
import axios from 'axios'
import diff from 'fast-diff'

import Highlights from '@/components/Layout/Editor/Highlights/Highlights'
import config from '@/config'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { PageTemplate } from '@/data/pageTemplate'
import { getDeadline } from '@/utils/getDeadline'
import { submitVerifiableSignature } from '@/utils/postSignature'
import { ImageContext, ImageKey, ImageStateType } from '@/context/image.context'
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import WikiProcessModal from '@/components/Elements/Modal/WikiProcessModal'
import { getWordCount } from '@/utils/getWordCount'
import { POST_IMG } from '@/services/wikis/queries'
import {
  MData,
  Wiki,
  CommonMetaIds,
  EditSpecificMetaIds,
  WikiRootBlocks,
} from '@/types/Wiki'
import { logEvent } from '@/utils/googleAnalytics'

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const initialEditorValue = ` `
const initialMsg =
  'Your Wiki is being processed. It will be available on the blockchain soon.'
const errorMessage = 'Oops, An Error Occurred. Wiki could not be created'
const successMessage = 'Wiki has been created successfully.'

const deadline = getDeadline()

const domain = {
  name: 'EP',
  version: '1',
  chainId: config.chainId,
  verifyingContract: config.wikiContractAddress,
}

const types = {
  SignedPost: [
    { name: 'ipfs', type: 'string' },
    { name: 'user', type: 'address' },
    { name: 'deadline', type: 'uint256' },
  ],
}

const MINIMUM_WORDS = 150

const CreateWiki = () => {
  const wiki = useAppSelector(state => state.wiki)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const toast = useToast()
  const { slug } = router.query
  const { isLoading: isLoadingWiki, data: wikiData } = useGetWikiQuery(
    typeof slug === 'string' ? slug : skipToken,
    {
      skip: router.isFallback,
    },
  )
  const { image, ipfsHash, updateImageState, isWikiBeingEdited } =
    useContext<ImageStateType>(ImageContext)
  const [{ data: accountData }] = useAccount()
  const [md, setMd] = useState<string>()
  const [openTxDetailsDialog, setOpenTxDetailsDialog] = useState<boolean>(false)
  const [isWritingCommitMsg, setIsWritingCommitMsg] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>()
  const [submittingWiki, setSubmittingWiki] = useState(false)
  const [wikiHash, setWikiHash] = useState<string>()
  const [isNewCreateWiki, setIsNewCreateWiki] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [loadingState, setIsLoading] = useState<
    'error' | 'loading' | undefined
  >('loading')
  const [wikiId, setWikiId] = useState<string>('')
  const [msg, setMsg] = useState<string>(initialMsg)
  const [txError, setTxError] = useState({
    title: '',
    description: '',
    opened: false,
  })
  const [{ data, error, loading: signing }, signTypedData] = useSignTypedData(
    {},
  )
  const [, wait] = useWaitForTransaction()
  const prevEditedWiki = useRef<{ wiki?: Wiki; isPublished: boolean }>({
    wiki: wikiData,
    isPublished: false,
  })

  const saveImage = async () => {
    const formData = new FormData()
    const blob = new Blob([image.type], {
      type: 'multipart/form-data',
    })

    formData.append('operations', POST_IMG)
    const map = `{"0": ["variables.file"]}`
    formData.append('map', map)
    formData.append('0', blob)

    const {
      data: {
        data: {
          pinImage: { IpfsHash },
        },
      },
    } = await axios.post(config.graphqlUrl, formData, {})

    return IpfsHash
  }

  const saveHashInTheBlockchain = async (ipfs: string) => {
    setWikiHash(ipfs)
    signTypedData({
      domain,
      types,
      value: {
        ipfs,
        user: accountData?.address || '',
        deadline,
      },
    }).then(response => {
      if (response.data) {
        setActiveStep(1)
      }
      if (response.error) {
        setIsLoading('error')
        setMsg(errorMessage)
      }
    })
  }

  const getImageHash = async () => (isWikiBeingEdited ? ipfsHash : saveImage())

  const getWikiSlug = () => slugify(String(wiki.title).toLowerCase())

  const getImageArrayBufferLength = () =>
    (image.type as ArrayBuffer).byteLength === 0

  const isValidWiki = () => {
    if (
      isWikiBeingEdited === false &&
      (!image ||
        image.type === null ||
        image.type === undefined ||
        getImageArrayBufferLength())
    ) {
      toast({
        title: 'Add a main image on the right column to continue',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (wiki.categories.length === 0) {
      toast({
        title: 'Add one category to continue',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    const words = getWordCount(md || '')

    if (words < MINIMUM_WORDS) {
      toast({
        title: `Add a minimum of ${MINIMUM_WORDS} words to continue, you have written ${words}`,
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (getWikiMetadataById(wiki, CommonMetaIds.PAGE_TYPE)?.value === null) {
      toast({
        title: 'Add a page type to continue',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    return true
  }
  const calculateEditInfo = (prevWiki: Wiki, currWiki: Wiki) => {
    const calculateContentChanged = () => {
      // check if content has changed
      const prevContent = prevWiki?.content
      const currContent = currWiki?.content

      // calculate percent changed and number of words changed in prevContent and currContent
      let contentAdded = 0
      let contentRemoved = 0
      let contentUnchanged = 0

      let wordsAdded = 0
      let wordsRemoved = 0

      diff(prevContent, currContent).forEach(part => {
        if (part[0] === 1) {
          contentAdded += part[1].length
          wordsAdded += getWordCount(part[1])
        }
        if (part[0] === -1) {
          contentRemoved += part[1].length
          wordsRemoved += getWordCount(part[1])
        }
        if (part[0] === 0) {
          contentUnchanged += part[1].length
        }
      })

      const percentChanged =
        ((contentAdded + contentRemoved) / contentUnchanged) * 100
      const wordsChanged = wordsAdded + wordsRemoved

      // update metadata in redux state
      dispatch({
        type: 'wiki/updateMetadata',
        payload: {
          id: EditSpecificMetaIds.WORDS_CHANGED,
          value: wordsChanged.toString(),
        },
      })

      dispatch({
        type: 'wiki/updateMetadata',
        payload: {
          id: EditSpecificMetaIds.PERCENT_CHANGED,
          value: percentChanged.toFixed(2),
        },
      })
    }

    // calculate which blocks have changed
    const blocksChanged = []

    // root level block changes
    if (prevWiki.content !== currWiki.content) {
      blocksChanged.push(WikiRootBlocks.CONTENT)
      calculateContentChanged()
    }
    if (prevWiki.title !== currWiki.title)
      blocksChanged.push(WikiRootBlocks.TITLE)
    if (prevWiki.categories !== currWiki.categories)
      blocksChanged.push('categories')
    if (prevWiki.tags !== currWiki.tags) blocksChanged.push(WikiRootBlocks.TAGS)
    if (prevWiki.summary !== currWiki.summary)
      blocksChanged.push(WikiRootBlocks.SUMMARY)
    const prevImgId = prevWiki.images && prevWiki.images[0].id
    const currImgId = currWiki.images && currWiki.images[0].id
    if (prevImgId !== currImgId) blocksChanged.push(WikiRootBlocks.WIKI_IMAGE)

    // common metadata changes
    Object.values(CommonMetaIds).forEach(id => {
      if (
        getWikiMetadataById(prevWiki, id)?.value !==
        getWikiMetadataById(currWiki, id)?.value
      )
        blocksChanged.push(id)
    })

    // update blocks changed metadata in redux state
    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: EditSpecificMetaIds.BLOCKS_CHANGED,
        value: blocksChanged.join(','),
      },
    })
  }

  const saveOnIpfs = async () => {
    if (!isValidWiki()) return

    logEvent({
      action: 'SUBMIT_WIKI',
      params: { address: accountData?.address, slug: getWikiSlug() },
    })

    if (accountData) {
      setOpenTxDetailsDialog(true)
      setSubmittingWiki(true)

      // Build the wiki object
      const imageHash = await getImageHash()

      let interWiki = { ...wiki }
      if (interWiki.id === '') interWiki.id = getWikiSlug()
      setWikiId(interWiki.id)

      interWiki = {
        ...interWiki,
        user: {
          id: accountData.address,
        },
        content: String(md).replace(/\n/gm, '  \n'),
        images: [{ id: imageHash, type: 'image/jpeg, image/png' }],
      }

      if (!isNewCreateWiki) {
        // calculate edit info for current wiki and previous wiki
        // previous wiki varies if editor is trying to publish
        // more than two edits to chain in same session

        if (prevEditedWiki.current.isPublished && prevEditedWiki.current.wiki) {
          calculateEditInfo(prevEditedWiki.current.wiki, interWiki)
        } else if (wikiData) {
          calculateEditInfo(wikiData, interWiki)
        }
      }

      // Build the wiki object after edit info has been calculated
      const finalWiki = {
        ...interWiki,
        metadata: store.getState().wiki.metadata,
      }

      prevEditedWiki.current = { wiki: finalWiki, isPublished: false }

      const wikiResult: any = await store.dispatch(
        postWiki.initiate({ data: finalWiki }),
      )

      if (wikiResult) saveHashInTheBlockchain(String(wikiResult.data))

      // clear all edit based metadata from redux state
      Object.values(EditSpecificMetaIds).forEach(id => {
        dispatch({
          type: 'wiki/updateMetadata',
          payload: {
            id,
            value: '',
          },
        })
      })

      setSubmittingWiki(false)
    }
  }

  const disableSaveButton = () =>
    isWritingCommitMsg ||
    submittingWiki ||
    !accountData?.address ||
    signing ||
    isLoadingWiki

  const handleOnEditorChanges = (val: string | undefined) => {
    setMd(val || ' ')
  }

  const updatePageTypeTemplate = useCallback(() => {
    const meta = [
      getWikiMetadataById(wiki, CommonMetaIds.PAGE_TYPE),
      getWikiMetadataById(wiki, CommonMetaIds.TWITTER_PROFILE),
    ]
    const pageType = PageTemplate.find(p => p.type === meta[0]?.value)

    setMd(String(pageType?.templateText))
  }, [wiki])

  const verifyTrxHash = useCallback(
    async (trxHash: string) => {
      const timer = setInterval(() => {
        try {
          const checkTrx = async () => {
            const trx = await wait({
              hash: trxHash,
            })
            if (trx.error) {
              setIsLoading('error')
              setMsg(errorMessage)
              clearInterval(timer)
            } else if (trx.data.confirmations > 1) {
              setIsLoading(undefined)
              setActiveStep(3)
              setMsg(successMessage)
              clearInterval(timer)
            }
          }
          checkTrx()
        } catch (err) {
          setIsLoading('error')
          setMsg(errorMessage)
          clearInterval(timer)
        }
      }, 3000)
    },
    [wait],
  )

  useEffect(() => {
    if (activeStep === 3) {
      prevEditedWiki.current.isPublished = true
    }
  }, [activeStep])

  // Reset the State to new wiki if there is no slug
  useEffect(() => {
    if (!slug) {
      setIsNewCreateWiki(true)
      dispatch({ type: 'wiki/reset' })
      setMd(initialEditorValue)
    } else {
      setIsNewCreateWiki(false)
    }
  }, [dispatch, slug])

  useEffect(() => {
    if (isLoadingWiki === false && !wikiData) setMd(initialEditorValue)
  }, [isLoadingWiki, wikiData])

  // update the page type template when the page type changes
  const presentPageType = useMemo(
    () =>
      wiki?.metadata?.find((m: MData) => m.id === CommonMetaIds.PAGE_TYPE)
        ?.value,
    [wiki?.metadata],
  )
  useEffect(() => {
    if (presentPageType) {
      let isMdPageTemplate = false
      PageTemplate.forEach(p => {
        if (p.templateText === md) isMdPageTemplate = true
      })
      if (isMdPageTemplate || md === ' ') updatePageTypeTemplate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presentPageType])

  useEffect(() => {
    const getSignedTxHash = async () => {
      if (data && wikiHash && accountData) {
        if (error) {
          setMsg(errorMessage)
          setIsLoading('error')
          return
        }
        try {
          const { data: relayerData }: any = await submitVerifiableSignature(
            data,
            wikiHash,
            accountData?.address,
            deadline,
          )

          if (relayerData && relayerData.hash) {
            setTxHash(relayerData.hash)
            setActiveStep(2)
          }
        } catch (err) {
          setIsLoading('error')
          setMsg(errorMessage)
        }
      }
    }
    getSignedTxHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error])

  useEffect(() => {
    if (
      wikiData &&
      wikiData.content.length > 0 &&
      wikiData.images &&
      wikiData.images.length > 0
    ) {
      // update isWikiBeingEdited
      updateImageState(ImageKey.IS_WIKI_BEING_EDITED, true)
      // update image hash
      updateImageState(ImageKey.IPFS_HASH, String(wikiData?.images[0].id))

      const { id, title, summary, content, tags, categories } = wikiData
      let { metadata } = wikiData

      // fetch the currently stored meta data of page that are not edit specific
      // (commonMetaIds) and append edit specific meta data (editMetaIds) with empty values
      metadata = [
        ...Object.values(CommonMetaIds).map(mId => {
          const meta = getWikiMetadataById(wikiData, mId)
          return { id: mId, value: meta?.value || '' }
        }),
        ...Object.values(EditSpecificMetaIds).map(mId => ({
          id: mId,
          value: '',
        })),
      ]

      const transformedContent = content.replace(/ {2}\n/gm, '\n')
      dispatch({
        type: 'wiki/setCurrentWiki',
        payload: {
          id,
          title,
          summary,
          content: transformedContent,
          tags,
          categories,
          metadata,
        },
      })

      setMd(String(transformedContent))
    }
  }, [dispatch, updateImageState, wikiData])

  useEffect(() => {
    if (txHash) verifyTrxHash(txHash)
  }, [txHash, verifyTrxHash])

  const handlePopupClose = () => {
    setMsg(initialMsg)
    setIsLoading('loading')
    setActiveStep(0)
    setOpenTxDetailsDialog(false)
  }

  return (
    <Box maxW="1900px" mx="auto" mb={8}>
      <HStack
        boxShadow="sm"
        borderRadius={4}
        borderWidth="1px"
        p={3}
        justifyContent="space-between"
        mx="auto"
        mb={4}
        mt={2}
        w="96%"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={MdTitle} color="gray.400" fontSize="25px" />
          </InputLeftElement>
          <Input
            fontWeight="500"
            color="linkColor"
            borderColor="transparent"
            fontSize="18px"
            variant="flushed"
            maxW="max(50%, 300px)"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: 'wiki/setCurrentWiki',
                payload: { title: event.target.value },
              })
            }}
            value={wiki.title}
            placeholder="Title goes here"
          />
        </InputGroup>
        {!isNewCreateWiki ? (
          // Publish button with commit message for wiki edit
          <Popover onClose={() => setIsWritingCommitMsg(false)}>
            <PopoverTrigger>
              <Button
                isLoading={submittingWiki}
                _disabled={{
                  opacity: disableSaveButton() ? 0.5 : undefined,
                  _hover: {
                    bgColor: 'grey !important',
                    cursor: 'not-allowed',
                  },
                }}
                loadingText="Loading"
                disabled={disableSaveButton()}
                onClick={() => setIsWritingCommitMsg(true)}
                mb={24}
              >
                Publish
              </Button>
            </PopoverTrigger>
            <PopoverContent m={4}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                Commit Message <small>(Optional)</small>{' '}
              </PopoverHeader>
              <PopoverBody>
                <Textarea
                  placeholder="Enter what changed..."
                  onChange={e =>
                    dispatch({
                      type: 'wiki/updateMetadata',
                      payload: {
                        id: EditSpecificMetaIds.COMMIT_MESSAGE,
                        value: e.target.value,
                      },
                    })
                  }
                />
              </PopoverBody>
              <PopoverFooter>
                <HStack spacing={2} justify="right">
                  <Button
                    onClick={() => {
                      dispatch({
                        type: 'wiki/updateMetadata',
                        payload: {
                          id: EditSpecificMetaIds.COMMIT_MESSAGE,
                          value: '',
                        },
                      })
                      setIsWritingCommitMsg(false)
                      saveOnIpfs()
                    }}
                    float="right"
                    variant="outline"
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={() => {
                      setIsWritingCommitMsg(false)
                      saveOnIpfs()
                    }}
                  >
                    Submit
                  </Button>
                </HStack>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        ) : (
          // Publish button without commit message at new create wiki
          <Button
            onClick={() => {
              dispatch({
                type: 'wiki/updateMetadata',
                payload: {
                  id: EditSpecificMetaIds.COMMIT_MESSAGE,
                  value: 'New Wiki Created 🎉',
                },
              })
              saveOnIpfs()
            }}
          >
            Publish
          </Button>
        )}
      </HStack>
      <Flex
        flexDirection={{ base: 'column', xl: 'row' }}
        justify="center"
        align="stretch"
        gap={8}
        px={{ base: 4, xl: 8 }}
      >
        <Box h="635px" w="full">
          <Skeleton isLoaded={!isLoadingWiki} w="full" h="635px">
            <Editor markdown={md || ''} onChange={handleOnEditorChanges} />
          </Skeleton>
        </Box>
        <Box minH="635px">
          <Skeleton isLoaded={!isLoadingWiki} w="full" h="full">
            <Center>
              <Highlights
                initialImage={ipfsHash}
                isToResetImage={isNewCreateWiki}
              />
            </Center>
          </Skeleton>
        </Box>
        <WikiProcessModal
          wikiId={wikiId}
          msg={msg}
          txHash={txHash}
          wikiHash={wikiHash}
          activeStep={activeStep}
          state={loadingState}
          isOpen={openTxDetailsDialog}
          onClose={() => handlePopupClose()}
        />
      </Flex>
      <Skeleton isLoaded={!isLoadingWiki} w="full" h="full">
        <Flex direction="column" justifyContent="center" alignItems="center">
          {txError.opened && (
            <Alert status="error" maxW="md" mb="3">
              <AlertIcon />
              <AlertTitle>{txError.title}</AlertTitle>
              <AlertDescription>{txError.description}</AlertDescription>
              <CloseButton
                onClick={() =>
                  setTxError({
                    title: '',
                    description: '',
                    opened: false,
                  })
                }
                position="absolute"
                right="5px"
              />
            </Alert>
          )}
        </Flex>
      </Skeleton>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug
  if (typeof slug === 'string') {
    store.dispatch(getWiki.initiate(slug))
  }
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default authenticatedRoute(memo(CreateWiki))
