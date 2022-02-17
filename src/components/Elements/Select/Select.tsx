import React from 'react'
import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react'

const Select = ({ children, ...rest }: SelectProps) => (
  <ChakraSelect {...rest}>{children}</ChakraSelect>
)

export default Select
