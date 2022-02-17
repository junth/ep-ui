import React from 'react'
import { Button } from '@chakra-ui/react'

const SocialIcon = ({ Icon }: { Icon: JSX.Element }) => (
  <Button size="md" variant="social">
    {Icon}
  </Button>
)

export default SocialIcon
