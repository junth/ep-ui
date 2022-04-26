import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import NextImage, { ImageProps } from 'next/image'

export type NextChakraImageProps = Omit<BoxProps, 'as'> & ImageProps

export const loader = ({ src, width, quality }: any) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

export const Image = ({
  src,
  alt,
  priority,
  placeholder,
  blurDataURL,
  ...rest
}: NextChakraImageProps) => (
  <Box {...rest} position="relative">
    <NextImage
      loader={loader}
      objectFit="cover"
      layout="fill"
      src={src}
      alt={alt}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
    />
  </Box>
)
