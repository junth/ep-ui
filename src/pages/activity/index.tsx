import React from 'react'
import { Box, Heading, VStack } from '@chakra-ui/react'
import ActivityCard from '@/components/Activity/ActivityCard'
import { ActivityData } from '@/data/ActivityData'

const Activity = () => (
  <Box bgColor="pageBg" mt={-8} mb={-8} pt={8} pb={8}>
    <Box w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
      <Heading my={8} as="h1" size="2xl" letterSpacing="wide">
        Recent Activity
      </Heading>
      <VStack spacing={4}>
        {ActivityData.map(activity => (
          <ActivityCard
            wikiImg={activity.wikiImg}
            title={activity.title}
            brief={activity.brief}
            editor={activity.editor}
            wordsChanged={activity.wordsChanged}
            percentChanged={activity.percentChanged}
            isFirstEdit={activity.isFirstEdit}
            lastModTimeStamp={activity.lastModTimeStamp}
          />
        ))}
      </VStack>
    </Box>
  </Box>
)

export default Activity
