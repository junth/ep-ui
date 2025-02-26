import React from 'react'
import {
  Spacer,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { getReadableDate } from '@/utils/getFormattedDate'
import { WikiImage } from '@/components/WikiImage'
import { getWikiSummary, WikiSummarySize } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import Link from 'next/link'
import { useENSData } from '@/hooks/useENSData'
import shortenAccount from '@/utils/shortenAccount'
import { shortenText } from '@/utils/shortenText'

const WikiPreviewCard = ({
  wiki,
  showLatestEditor = false,
  lastUpdated,
}: {
  wiki: Wiki
  showLatestEditor?: boolean
  lastUpdated?: string
}) => {
  const { updated, title, id } = wiki
  const [, username] = useENSData(wiki.user?.id || '')
  const getLatestEdited = () => {
    let lastEditedTime = null
    if (updated) {
      lastEditedTime = getReadableDate(updated)
    } else if (lastUpdated) {
      lastEditedTime = getReadableDate(lastUpdated)
    }
    return lastEditedTime
  }
  return (
    <LinkBox
      w="100%"
      h="100%"
      bgColor="cardBg"
      boxShadow="xl"
      rounded="xl"
      overflow="hidden"
      cursor="pointer"
    >
      <WikiImage h={200} imageURL={getWikiImageUrl(wiki)} layout="fill" />

      <Stack spacing={3} p={4}>
        <LinkOverlay href={`/wiki/${id}`}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            noOfLines={1}
            textOverflow="ellipsis"
            overflow="hidden"
            orientation="vertical"
          >
            {shortenText(title, 65)}
          </Text>
        </LinkOverlay>
        <Flex h="95" direction="column">
          <Box flex="1">
            <Text
              fontSize="md"
              opacity={0.7}
              noOfLines={2}
              textOverflow="ellipsis"
              overflow="hidden"
              orientation="vertical"
            >
              {getWikiSummary(wiki, WikiSummarySize.Small)}
            </Text>
          </Box>
          <Spacer />
          <Box>
            <HStack flexWrap="wrap" mt={2} justify="space-between">
              {showLatestEditor && (
                <HStack fontSize="sm" py={2} color="brand.500">
                  <DisplayAvatar address={wiki.user?.id} />
                  <Link href={`/account/${wiki.user?.id}`}>
                    {username || shortenAccount(wiki.user?.id || '')}
                  </Link>
                </HStack>
              )}
              <Text py={2} m="0px !important" color="gray.400" fontSize="sm">
                Last Edited {getLatestEdited()}
              </Text>
            </HStack>
          </Box>
        </Flex>
      </Stack>
    </LinkBox>
  )
}

export default WikiPreviewCard
