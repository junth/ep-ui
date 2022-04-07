import { FilterLayout } from '@/components/Profile/FilterLayout'
import { useProfileContext } from '@/components/Profile/utils'
import { getUserWikis } from '@/services/wikis'
import { Center, SimpleGrid, Text, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { EmptyState } from '@/components/Profile/EmptyState'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Wiki } from '@/types/Wiki'
import { store } from '@/store/store'
import { FETCH_DELAY_TIME, WIKIS_PER_PAGE } from '@/data/WikiConstant'
import WikiPreviewCard from '../Wiki/WikiPreviewCard/WikiPreviewCard'

export const Collected = () => {
  const { displaySize } = useProfileContext()
  const router = useRouter()
  const address = router.query.profile as string
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [wikis, setWikis] = useState<Wiki[] | []>([])
  const [offset, setOffset] = useState<number>(0)

  const fetchMoreWikis = () => {
    const updatedOffset = offset + WIKIS_PER_PAGE
    setTimeout(() => {
      const fetchNewWikis = async () => {
        const result = await store.dispatch(
          getUserWikis.initiate({
            id: address,
            limit: WIKIS_PER_PAGE,
            offset: updatedOffset,
          }),
        )
        if (result.data && result.data?.length > 0) {
          const data = result.data || []
          const updatedWiki = [...wikis, ...data]
          setWikis(updatedWiki)
          setOffset(updatedOffset)
        } else {
          setHasMore(false)
        }
      }
      fetchNewWikis()
    }, FETCH_DELAY_TIME)
  }

  return (
    <FilterLayout>
      <InfiniteScroll
        dataLength={wikis.length}
        next={fetchMoreWikis}
        hasMore={hasMore}
        loader={
          <Center my="10">
            <Spinner size="xl" />
          </Center>
        }
        endMessage={
          <Center my="10">
            <Text fontWeight="semibold">
              {wikis.length < 1 ? (
                <EmptyState />
              ) : (
                'Yay! You have seen it all 🥳 '
              )}
            </Text>
          </Center>
        }
      >
        <SimpleGrid minChildWidth={displaySize} w="full" spacing="4">
          {wikis.map((item, i) => (
            <WikiPreviewCard wiki={item} key={i} />
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </FilterLayout>
  )
}
