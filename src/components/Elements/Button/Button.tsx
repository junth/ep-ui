import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import React from 'react'

const Button = ({ children, ...rest }: ButtonProps) => (
  <ChakraButton {...rest}>{children}</ChakraButton>
)

export default Button
