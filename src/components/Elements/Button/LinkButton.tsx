import React from 'react'
import Link, { LinkProps } from 'next/link'
import { Button, ButtonProps } from '@chakra-ui/react'

type ChakraAndNextProps = ButtonProps & LinkProps

const LinkButton = ({ href, children, ...props }: ChakraAndNextProps) => (
  <Link href={href} passHref>
    <Button as="a" {...props}>
      {children}
    </Button>
  </Link>
)

export default LinkButton
