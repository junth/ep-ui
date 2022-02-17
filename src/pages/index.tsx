import React from 'react'
import { NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import wrapper from '@/store/store'
import {
  getRunningOperationPromises,
  getWikis,
  useGetWikisQuery,
} from '@/services/wikis'
import WikiListCard from '@/components/Wiki/WikiListCard/WikiListCard'
import { Hero } from '@/components/Landing/Hero'
import { NotableDrops } from '@/components/Landing/NotableDrops'
import CategoriesList from '@/components/Landing/CategoriesList'

export const Home: NextPage = () => {
  const result = useGetWikisQuery()
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
        <NotableDrops />
        <CategoriesList />
        <WikiListCard wikis={data} />
      </Flex>
    </main>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    store.dispatch(getWikis.initiate())
    await Promise.all(getRunningOperationPromises())

    return {
      props: {},
    }
  },
)

export default Home
