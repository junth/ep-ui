import React from 'react'
import { Box, Heading, VStack } from '@chakra-ui/react'
import ActivityCard from '@/components/Activity/ActivityCard'

const Activity = () => (
  <Box bgColor="pageBg" mt={-8} mb={-8} pt={8} pb={8}>
    <Box w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
      <Heading my={8} as="h1" size="2xl" letterSpacing="wide">
        Recent Activity
      </Heading>
      <VStack spacing={4}>
        <ActivityCard
          wikiImg="https://everipedia-storage.s3.amazonaws.com/ProfilePicture/lang_en/non-fungible-conference-2022/mainphoto_thumb.webp"
          title="Non-Fungible Conference 2022"
          brief="Non-Fungible Conference 2022 is an NFT event taking place in Europe between April 4th to 5th, 2022. The event has more than 1500"
          editor="Feekaryo"
          wordsChanged={547}
          percentChanged={0.5}
          isFirstEdit={false}
          lastModTimeStamp="2022-02-24T14:22:45.000Z"
        />
        <ActivityCard
          wikiImg="https://everipedia-storage.s3.amazonaws.com/ProfilePicture/lang_en/non-fungible-conference-2022/mainphoto_thumb.webp"
          title="Non-Fungible Conference 2022"
          brief="Non-Fungible Conference 2022 is an NFT event taking place in Europe between April 4th to 5th, 2022. The event has more than 1500"
          editor="Feekaryo"
          wordsChanged={547}
          percentChanged={0.5}
          isFirstEdit={false}
          lastModTimeStamp="2022-02-24T14:22:45.000Z"
        />
        <ActivityCard
          wikiImg="https://everipedia-storage.s3.amazonaws.com/ProfilePicture/lang_en/non-fungible-conference-2022/mainphoto_thumb.webp"
          title="Non-Fungible Conference 2022"
          brief="Non-Fungible Conference 2022 is an NFT event taking place in Europe between April 4th to 5th, 2022. The event has more than 1500"
          editor="Feekaryo"
          wordsChanged={547}
          percentChanged={1}
          isFirstEdit
          lastModTimeStamp="2022-02-24T14:22:45.000Z"
        />
        <ActivityCard
          wikiImg="https://everipedia-storage.s3.amazonaws.com/ProfilePicture/lang_en/non-fungible-conference-2022/mainphoto_thumb.webp"
          title="Non-Fungible Conference 2022"
          brief="Non-Fungible Conference 2022 is an NFT event taking place in Europe between April 4th to 5th, 2022. The event has more than 1500"
          editor="Feekaryo"
          wordsChanged={547}
          percentChanged={0.5}
          isFirstEdit
          lastModTimeStamp="2022-02-24T14:22:45.000Z"
        />
      </VStack>
    </Box>
  </Box>
)

export default Activity
