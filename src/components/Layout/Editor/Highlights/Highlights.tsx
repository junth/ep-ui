import React, { useState, memo } from 'react'
import {
  Flex,
  Text,
  useDisclosure,
  Button,
  Box,
  HStack,
} from '@chakra-ui/react'
import { RiFilmLine } from 'react-icons/ri'

import { ImageInput, Dropzone } from '@/components/Elements'
import { useDispatch } from 'react-redux'
import { saveImage } from '@/utils/create-wiki'
import HighlightsModal from './HighlightsModal/HighlightsModal'
import MediaModal from './MediaModal/MediaModal'
import SummaryInput from './SummaryInput'

type HightLightsType = {
  initialImage: string | undefined
  isToResetImage: boolean
}

const Highlights = ({ initialImage, isToResetImage }: HightLightsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const {
    isOpen: isMediaOpen,
    onOpen: mediaOpen,
    onClose: mediaClose,
  } = useDisclosure()
  const [hideDropzone, setHideDropzone] = useState(false)
  const [hideImageInput, setHideImageInput] = useState(false)

  const handleSetImage = async (_: string, value: ArrayBuffer) => {
    // upload image to ipfs
    const IPFSHash = await saveImage({ type: value, id: '' })

    // update image state
    dispatch({
      type: 'wiki/addWikiImageIPFS',
      payload: IPFSHash,
    })
  }

  const handleDeleteImage = () =>
    dispatch({
      type: 'wiki/deleteWikiImages',
    })

  const dropZoneActions = {
    setImage: handleSetImage,
    setHideImageInput,
    isToResetImage,
    deleteImage: handleDeleteImage,
    initialImage,
    showFetchedImage: true,
    textType: 'main image',
  }
  return (
    <Flex
      direction="column"
      gap={4}
      w={{ base: 'full', xl: '400px' }}
      border="1px"
      borderColor="borderColor"
      borderRadius="7px"
      padding="15px"
      h="auto"
    >
      <SummaryInput />
      {!hideDropzone && <Dropzone dropZoneActions={dropZoneActions} />}
      {!hideImageInput && (
        <ImageInput
          setImage={handleSetImage}
          setHideDropzone={setHideDropzone}
          deleteImage={handleDeleteImage}
          showFetchedImage
        />
      )}
      <HStack borderWidth="1px" justify="space-between" gap={2} p={2}>
        <Flex ml={2} gap={2} color="linkColor">
          <Box mt={1}>
            <RiFilmLine size="16" />
          </Box>
          <Text>Media</Text>
        </Flex>
        <Button maxW="190px" onClick={mediaOpen} px={3} size="sm">
          <Text fontSize="sm">Add images/videos</Text>
        </Button>
      </HStack>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Flex
          w="full"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button w="full" variant="outline" color="linkColor" onClick={onOpen}>
            Edit Wiki Details
          </Button>
        </Flex>
      </Flex>
      <HighlightsModal isOpen={isOpen} onClose={onClose} />
      <MediaModal isOpen={isMediaOpen} onClose={mediaClose} />
    </Flex>
  )
}

export default memo(Highlights)
