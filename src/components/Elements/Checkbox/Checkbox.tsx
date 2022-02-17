import React from 'react'
import { Checkbox as ChakraCheckBox, CheckboxProps } from '@chakra-ui/react'

const Checkbox = ({ children, ...rest }: CheckboxProps) => (
  <ChakraCheckBox {...rest}>{children}</ChakraCheckBox>
)

export default Checkbox
