import React from 'react'
import {
  VStack,
  Heading,
  Divider,
  List,
  ListItem,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'

interface RelatedTopicsProp {
  topics: Array<{ name: string; url: string; isSectionLink?: boolean }>
}
const RelatedTopics = ({ topics }: RelatedTopicsProp) => (
  <VStack
    position="sticky"
    top="100px"
    display="inline-block"
    bgColor="pageBg"
    p={10}
    borderRadius={12}
  >
    <Heading as="h2" size="md">
      Related Topics
    </Heading>
    <Divider filter="brightness(0.9)" />
    <List spacing={2}>
      {topics.map(topic => (
        <ListItem mt="20px">
          <NextLink href={topic.url} scroll={!!topic.isSectionLink} passHref>
            <Link href="passRef">{topic.name}</Link>
          </NextLink>
        </ListItem>
      ))}
    </List>
  </VStack>
)

export default RelatedTopics
