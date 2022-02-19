import React from 'react'
import { VStack, Heading, Flex } from '@chakra-ui/react'
import CNNLogo from './AsSeenLogos/cnn.svg'
import ForbesLogo from './AsSeenLogos/forbes.svg'
import ReutersLogo from './AsSeenLogos/reuters.svg'
import WiredLogo from './AsSeenLogos/wired.svg'
import CoinDeskLogo from './AsSeenLogos/coindesk.svg'
import FortuneLogo from './AsSeenLogos/fortune.svg'

const AboutAsSeenIn = () => (
  <VStack
    spacing={8}
    my={8}
    borderColor="borderColor"
    borderWidth="1px"
    p={8}
    borderRadius={8}
  >
    <Heading size="lg">As Seen In</Heading>
    <Flex gap={8} flexWrap="wrap" justifyContent="center" alignItems="center">
      <CNNLogo height="min(40px, 6vw)" fill="#8a939b" />
      <ForbesLogo height="min(40px, 6vw)" fill="#8a939b" />
      <ReutersLogo height="min(40px, 6vw)" fill="#8a939b" />
      <WiredLogo height="min(40px, 6vw)" fill="#8a939b" />
      <CoinDeskLogo height="min(40px, 6vw)" fill="#8a939b" />
      <FortuneLogo height="min(40px, 6vw)" fill="#8a939b" />
    </Flex>
  </VStack>
)

export default AboutAsSeenIn
