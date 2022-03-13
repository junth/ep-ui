import React, { ChangeEvent, useState } from 'react'
import { Button, Flex, Input, Image } from '@chakra-ui/react'
import axios from 'axios'
import buffer from 'buffer'

type ImageInputType = {
  setHideDropzone: (hide: boolean) => void
  setImage: (f: string | ArrayBuffer | null) => void
  deleteImage: () => void
}

const ImageInput = ({
  setHideDropzone,
  setImage,
  deleteImage,
}: ImageInputType) => {
  const [imgSrc, setImageSrc] = useState<string>()

  const handleOnImageInputChanges = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setImageSrc(event.target.value)
    setHideDropzone(true)
    try {
      const { data } = await axios.get(String(event.target.value), {
        responseType: 'arraybuffer',
      })
      setImage(new buffer.Buffer(data as Buffer))
    } catch (error) {
      return null
    }
    return null
  }

  return (
    <Flex
      w="full"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {imgSrc ? (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <Image objectFit="cover" boxSize="300" src={imgSrc} alt="Input" />

          <Button
            w="25%"
            shadow="md"
            bg="red.400"
            onClick={() => {
              setImageSrc(undefined)
              setHideDropzone(false)
              deleteImage()
            }}
          >
            Delete
          </Button>
        </Flex>
      ) : (
        <Input
          onChange={handleOnImageInputChanges}
          placeholder="Paste a link here"
        />
      )}
    </Flex>
  )
}

export default ImageInput
