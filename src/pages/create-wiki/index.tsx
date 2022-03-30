import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Grid,
  GridItem,
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Center,
} from '@chakra-ui/react'
import { useAccount, useSignTypedData, useWaitForTransaction } from 'wagmi'
import slugify from 'slugify'
import axios from 'axios'
import Highlights from '@/components/Layout/Editor/Highlights/Highlights'
import config from '@/config'
import { useAppSelector } from '@/store/hook'
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { PageTemplate } from '@/constant/pageTemplate'
import { getDeadline } from '@/utils/getDeadline'
import WikiProcessModal from '@/components/Elements/Modal/WikiProcessModal'

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const initialEditorValue = `# Place name\n**Place_name** is a place ...\n## History\n**Place_name** is known for ...\n## Features\n**Place_name** offers ...
`
const initialMsg =
  'Your Wiki is being processed. It will be available on the blockchain soon.'
const errorMessage = 'Oops, An Error Occurred. Wiki could not be created'
const successMessage = 'Wiki has been created successfully.'

const deadline = getDeadline()

const CreateWiki = () => {
  const wiki = useAppSelector(state => state.wiki)
  const [{ data: accountData }] = useAccount()
  const [md, setMd] = useState<string>()
  const [openTxDetailsDialog, setOpenTxDetailsDialog] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>()
  const [submittingWiki, setSubmittingWiki] = useState(false)
  const [wikiHash, setWikiHash] = useState<string>()
  const [activeStep, setActiveStep] = useState<number>(1)
  const [loadingState, setIsLoading] = useState<
    'error' | 'loading' | undefined
  >('loading')
  const [wikiId, setWikiId] = useState<string>('')
  const [msg, setMsg] = useState<string>(initialMsg)
  const [triggerUpdate, setTriggerUpdate] = useState('')
  const [txError, setTxError] = useState({
    title: '',
    description: '',
    opened: false,
  })

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

  const [{ data, error, loading: signing }, signTypedData] = useSignTypedData(
    {},
  )

  const [, wait] = useWaitForTransaction()

  const saveImage = async () => {
    const formData = new FormData()
    const blob = new Blob([wiki.images[0].type as ArrayBuffer], {
      type: 'multipart/form-data',
    })

    formData.append('file', blob)
    formData.append('name', wiki.images[0].id)

    const {
      data: { ipfs },
    } = await axios.post('/api/ipfs-image', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })

    return ipfs
  }

  const saveHashInTheBlockchain = async (ipfs: string) => {
    setWikiHash(ipfs)
    setIsLoading('loading')
    setActiveStep(2)
    await signTypedData({
      domain,
      types,
      value: {
        ipfs,
        user: accountData?.address || '',
        deadline,
      },
    })
  }

  const saveOnIpfs = async () => {
    if (accountData) {
      setOpenTxDetailsDialog(true)
      setSubmittingWiki(true)
      const imageHash = await saveImage()

      let tmp = { ...wiki }

      tmp.id = slugify(String(wiki.title).toLowerCase())
      setWikiId(tmp.id)
      tmp = {
        ...tmp,
        content: String(md),
        user: {
          id: accountData.address,
        },
        images: [{ id: imageHash, type: 'image/jpeg, image/png' }],
      }

      const {
        data: { ipfs },
      } = await axios.post('/api/ipfs', tmp)

      if (ipfs) {
        saveHashInTheBlockchain(ipfs)
      }

      setSubmittingWiki(false)
    }
  }

  const disableSaveButton = () =>
    wiki.images.length === 0 ||
    submittingWiki ||
    !accountData?.address ||
    signing

  const handleOnEditorChanges = (val: string | undefined) => {
    if (val) setMd(val)
  }

  useEffect(() => {
    if (wiki) {
      const meta = getWikiMetadataById(wiki, 'page-type')
      const pageType = PageTemplate.find(p => p.type === meta?.value)
      setTriggerUpdate(String(pageType?.templateText))
    }
  }, [wiki])

  useEffect(() => {
    setMd(initialEditorValue)
  }, [])

  const verifyTrxHash = async (trxHash: string) => {
    try {
      const checkTrx = async () => {
        const result = await wait({
          hash: trxHash,
        })
        if (result.error) {
          setIsLoading('error')
          setMsg(errorMessage)
        } else if (result.data) {
          setIsLoading(undefined)
          setActiveStep(3)
          setMsg(successMessage)
        }
      }
      checkTrx()
    } catch (err) {
      setIsLoading('error')
      setMsg(errorMessage)
    }
  }

  useEffect(() => {
    async function signData(
      signedData: string | undefined,
      signingError: Error | undefined,
    ) {
      if (signingError) {
        setMsg(errorMessage)
        setIsLoading('error')
        return
      }

      if (signedData) {
        const signature = signedData.substring(2)
        const r = `0x${signature.substring(0, 64)}`
        const s = `0x${signature.substring(64, 128)}`
        const v = parseInt(signature.substring(128, 130), 16)

        try {
          const relayerData = await axios.post(
            `${config.epApiBaseUrl}relayer`,
            {
              ipfs: wikiHash,
              userAddr: accountData?.address,
              deadline,
              v,
              r,
              s,
            },
          )
          setTxHash(relayerData.data.hash)
        } catch (err) {
          setIsLoading('error')
          setMsg(errorMessage)
        }
      }
    }
    signData(data, error)
  }, [data, error])

  useEffect(() => {
    if (txHash) {
      verifyTrxHash(txHash)
    }
  }, [txHash])

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      templateRows="repeat(3, 1fr)"
      gap={4}
      h={['1350px', '1450px', '1450px', '1100px']}
      my="15px"
    >
      <GridItem rowSpan={[2, 1, 1, 2]} colSpan={[3, 3, 3, 2, 2]} maxH="690px">
        <Editor
          markdown={triggerUpdate}
          initialValue={initialEditorValue}
          onChange={handleOnEditorChanges}
        />
      </GridItem>
      <GridItem rowSpan={[1, 2, 2, 2]} colSpan={[3, 3, 3, 1, 1]}>
        <Center>
          <Highlights />
        </Center>
      </GridItem>
      <GridItem mt="3" rowSpan={1} colSpan={3}>
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
          <Button
            isLoading={submittingWiki}
            loadingText="Loading"
            disabled={disableSaveButton()}
            onClick={saveOnIpfs}
          >
            Publish Wiki
          </Button>
        </Flex>
      </GridItem>

      <WikiProcessModal
        wikiId={wikiId}
        msg={msg}
        txHash={txHash}
        wikiHash={wikiHash}
        activeStep={activeStep}
        state={loadingState}
        isOpen={openTxDetailsDialog}
        onClose={() => setOpenTxDetailsDialog(false)}
      />
    </Grid>
  )
}

export default authenticatedRoute(CreateWiki)
