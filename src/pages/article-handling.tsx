import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Grid, GridItem, Flex, Button, Text } from '@chakra-ui/react'
import { useAccount, useContractWrite } from 'wagmi'
import slugify from 'slugify'
import axios from 'axios'

import { useSelector } from 'react-redux'
import { getAccount } from '@/utils/getAccount'
import Highlights from '@/components/Layout/Editor/Highlights/Highlights'
import Modal from '@/components/Elements/Modal/Modal'
import { Wiki } from '@/types'
import { useAppDispatch } from '@/store/hook'
import { WikiAbi } from '../abi/Wiki.abi'

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const initialEditorValue = `
  # Hello Web3 World.
  **Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.**
  ***
  *Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.*

  ~~Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo~~

  > a quote


| table title | a title |
| --- | --- |
| tb body | tb body |

  1. Numbered list item
  2. An item
  3. third item

  - Bullet list item
  - item
  - yep, an item
`

const ArticleHandling = () => {
  const wiki = useSelector((state: any) => state.wiki as Wiki)
  const dispatch = useAppDispatch()
  const [{ data: accountData }] = useAccount()
  const [md, setMd] = useState<string>()
  const [openTxDetailsDialog, setOpenTxDetailsDialog] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>()

  const [{ data: postData, /* error, */ loading }, write] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_WIKI_CONTRACT_ADDRESS || '',
      contractInterface: WikiAbi,
    },
    'post',
  )

  const saveImage = async () => {
    const formData = new FormData()
    const blob = new Blob([wiki.content.images[0].type as ArrayBuffer], {
      type: 'multipart/form-data',
    })

    formData.append('rawImg', blob)

    const {
      data: { ipfs },
    } = await axios.post('/api/ipfs', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })

    return ipfs
  }

  const saveHashInTheBlockchain = async (hash: string) =>
    write({ args: [hash] })

  const saveOnIpfs = async () => {
    const imageHash = await saveImage()

    let tmp = { ...wiki }

    tmp.id = slugify(String(wiki.content.title).toLowerCase())
    tmp = {
      ...tmp,
      content: {
        ...tmp.content,
        createdAt: Math.floor(new Date(tmp.content.createdAt).getTime() / 1000),
        lastModified: Math.floor(
          new Date(String(tmp.content.lastModified)).getTime() / 1000,
        ),
        content: String(md),
        user: {
          id: getAccount(accountData),
        },
        images: [{ id: imageHash, type: 'image/jpeg, image/png' }],
      },
    }

    const {
      data: { ipfs },
    } = await axios.post('/api/ipfs', tmp)

    if (ipfs) saveHashInTheBlockchain(ipfs)
  }

  const disableSaveButton = () =>
    wiki.content.images.length === 0 ||
    loading ||
    wiki.content.lastModified === null ||
    !accountData?.address

  const handleOnEditorChanges = (val: string) => {
    if (val) {
      setMd(val)
      dispatch({
        type: 'wiki/setCurrentWiki',
        payload: { content: { lastModified: new Date().toUTCString() } },
      })
    }
  }

  useEffect(() => {
    if (postData) {
      setOpenTxDetailsDialog(true)
      setTxHash(postData.hash)
    }
  }, [postData])

  useEffect(() => {
    setMd(initialEditorValue)
  }, [])

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      templateRows="repeat(3, 1fr)"
      gap={4}
      h="1200px"
      mt="15px"
    >
      <GridItem h={[400, 500]} rowSpan={[1, 1, 2]} colSpan={[3, 3, 2, 2, 2]}>
        <Editor
          initialValue={initialEditorValue}
          onChange={handleOnEditorChanges}
        />
      </GridItem>
      <GridItem rowSpan={[1, 1, 2]} colSpan={[3, 3, 1, 1, 1]}>
        <Highlights />
      </GridItem>
      <GridItem rowSpan={1} colSpan={3}>
        <Flex direction="row" justifyContent="center" alignItems="center">
          <Button disabled={disableSaveButton()} onClick={saveOnIpfs}>
            {!loading ? 'Save' : 'Loading'}
          </Button>
        </Flex>
      </GridItem>
      <Modal
        title="Transaction details"
        enableBottomCloseButton
        isOpen={openTxDetailsDialog}
        onClose={() => setOpenTxDetailsDialog(false)}
        SecondaryButton={
          <Button
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL}tx/${txHash}`,
              )
            }
            variant="outline"
          >
            View in Block Explorer
          </Button>
        }
      >
        <Text align="center">
          The wiki was successfully posted on the Polygon blockchain!
        </Text>
      </Modal>
    </Grid>
  )
}

export default ArticleHandling
