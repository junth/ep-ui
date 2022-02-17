import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { RiCloseLine } from 'react-icons/ri'

import Button from '../Button/Button'
import Input from '../Input/Input'

type ImageInputType = {
  setHideDropzone: (hide: boolean) => void
}

const ImageInput = ({ setHideDropzone }: ImageInputType) => {
  const [imgSrc, setImageSrc] = useState<string>()

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
          gap={4}
        >
          <img src={imgSrc} alt="input" />
          <Button
            w="25%"
            shadow="md"
            bg="red.400"
            onClick={() => {
              setImageSrc(undefined)
              setHideDropzone(false)
            }}
          >
            <RiCloseLine />
          </Button>
        </Flex>
      ) : (
        <Input
          onChange={event => {
            setImageSrc(event.target.value)
            setHideDropzone(true)
          }}
          placeholder="Paste a link here"
        />
      )}
    </Flex>
  )
}

export default ImageInput
