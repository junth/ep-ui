import React, { ChangeEvent, useState } from 'react'
import { Button, Flex, Input, Image, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type ImageInputType = {
  setHideDropzone?: (hide: boolean) => void
  setImage: (name: string, f: ArrayBuffer) => void
  deleteImage?: () => void
  showFetchedImage: boolean
}

const ImageInput = ({
  setHideDropzone,
  setImage,
  deleteImage,
  showFetchedImage,
}: ImageInputType) => {
  const [imgSrc, setImageSrc] = useState<string>()
  const toast = useToast()

  const handleOnImageInputChanges = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setImageSrc(event.target.value)

    if (setHideDropzone) {
      setHideDropzone(true)
    }
    try {
      const imageUrl = event.target.value
      const FullUrl = `https://everipedia-cors.vercel.app/?url=${imageUrl}`
      const response = await fetch(FullUrl, {
        method: 'GET',
        headers: {},
      })
      if (response.status !== 200) {
        toast({
          title: 'Image could not be fetched. Ensure you have the right link',
          status: 'error',
          duration: 2000,
        })
        return
      }
      const data = await response.arrayBuffer()
      setImage(event.target.value, Buffer.from(data))
      if (!showFetchedImage) {
        setImageSrc('')
      }
      toast({
        title: 'Image successfully Fetched',
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      toast({
        title: 'Image could not be fetched. Ensure you have the right link',
        status: 'error',
        duration: 2000,
      })
    }
  }
  const { t } = useTranslation()
  return (
    <Flex
      mt={imgSrc && showFetchedImage ? 0 : -20}
      mb={5}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {imgSrc && showFetchedImage ? (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <Image
            objectFit="cover"
            h="255px"
            w="full"
            borderRadius={4}
            overflow="hidden"
            src={imgSrc}
            alt="Input"
          />
          <Button
            w="25%"
            shadow="md"
            bg="red.400"
            onClick={() => {
              setImageSrc(undefined)
              if (deleteImage && setHideDropzone) {
                setHideDropzone(false)
                deleteImage()
              }
            }}
          >
            Clear
          </Button>
        </Flex>
      ) : (
        <Input
          w="90%"
          textAlign="center"
          value={imgSrc}
          onChange={handleOnImageInputChanges}
          placeholder={`${t('pasteMainImgLabel')}`}
        />
      )}
    </Flex>
  )
}

export default ImageInput
