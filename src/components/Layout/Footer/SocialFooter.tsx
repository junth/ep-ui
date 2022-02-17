import React from 'react'
import { SimpleGrid, Stack, Heading } from '@chakra-ui/react'
import { PhoneIcon, ChatIcon, EmailIcon } from '@chakra-ui/icons'
import { SocialIcon } from '@/components/Elements'

const SocialFooter = () => (
  <Stack align={{ base: 'center', lg: 'flex-start' }}>
    <Heading size="lg" py={2}>
      Join the community
    </Heading>
    <SimpleGrid columns={{ base: 3, lg: 6 }}>
      <SocialIcon Icon={<EmailIcon w={5} h={6} />} />
      <SocialIcon Icon={<PhoneIcon w={5} h={6} />} />
      <SocialIcon Icon={<ChatIcon w={5} h={6} />} />
      <SocialIcon Icon={<EmailIcon w={5} h={6} />} />
      <SocialIcon Icon={<PhoneIcon w={5} h={6} />} />
      <SocialIcon Icon={<ChatIcon w={5} h={6} />} />
    </SimpleGrid>
  </Stack>
)

export default SocialFooter
