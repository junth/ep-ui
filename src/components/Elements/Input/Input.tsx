import React from 'react'
import { Input as ChakraInput, InputProps } from '@chakra-ui/react'

const Input = ({ children, ...rest }: InputProps) => (
  <ChakraInput {...rest}>{children}</ChakraInput>
)

export default Input
