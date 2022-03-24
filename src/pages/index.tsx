import React from 'react'
import { NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import {
  getPromotedWikis,
  getRunningOperationPromises,
  useGetPromotedWikisQuery,
} from '@/services/wikis'
import { Hero } from '@/components/Landing/Hero'
import { NotableDrops } from '@/components/Landing/NotableDrops'
import CategoriesList from '@/components/Landing/CategoriesList'
import { store } from '@/store/store'

export const Home: NextPage = () => {
  const result = useGetPromotedWikisQuery()
  const { data } = result

  return (
    <main>
      <Flex
        direction="column"
        mx="auto"
        w="fit-content"
        px={{ base: 6, lg: 20 }}
        py={{ lg: 20 }}
        gap={10}
      >
        <Hero />
        <NotableDrops drops={data} />
        <CategoriesList />
      </Flex>
    </main>
  )
}

export async function getServerSideProps() {
  store.dispatch(getPromotedWikis.initiate())
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Home
