import React from 'react'
import { Button } from '@chakra-ui/react'
import Link from '@/components/Elements/Link/Link'

const SocialIcon = ({ Icon, link }: { Icon: JSX.Element; link: string }) => (
  <Link target="_blank" href={link} _hover={{ textDecoration: 'none' }}>
    <Button size="md" variant="social">
      {Icon}
    </Button>
  </Link>
)

export default SocialIcon
