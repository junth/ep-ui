import { FilterLayout } from '@/components/Profile/FilterLayout'
import { useProfileContext } from '@/components/Profile/utils'
import { getUserWikis } from '@/services/wikis'
import { Center, SimpleGrid, Text, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { CollectionItem } from '@/components/Profile/CollectionItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Wiki } from '@/types/Wiki'
import { store } from '@/store/store'

const limit = 3
let offset = 0

export const Collected = () => {
  const { displaySize } = useProfileContext()
  const router = useRouter()
  const address = router.query.profile as string
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [wikis, setWikis] = useState<Wiki[] | []>([])

  const fetchMoreWikis = () => {
    offset += limit
    setTimeout(() => {
      const fetchNewWikis = async () => {
        const result = await store.dispatch(
          getUserWikis.initiate({ id: address, limit, offset }),
        )
        if (result.data && result.data?.length > 0) {
          const data = result.data || []
          const updatedWiki = [...wikis, ...data]
          setWikis(updatedWiki)
        } else {
          setHasMore(false)
        }
      }
      fetchNewWikis()
    }, 3000)
  }

  return (
    <FilterLayout>
      {wikis.length < 1 && !hasMore && <Center>No Wikis found!</Center>}
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
              {wikis.length < 1
                ? 'No Wikis found!'
                : 'Yay! You have seen it all 🥳 '}
            </Text>
          </Center>
        }
      >
        <SimpleGrid minChildWidth={displaySize} w="full" spacing="4">
          {wikis.map((item, i) => (
            <CollectionItem key={i} item={item} />
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </FilterLayout>
  )
}
