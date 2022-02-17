import React from 'react'
import { NextPage } from 'next'
import { Divider, Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import ToggleText from '@/components/Elements/ToggleText/ToggleText'
import CategoryCard from '@/components/Categories/CategoryCard'

export const sampleCategories: {
  id: string
  img: string
  label: string
  description: string
  url: string
  icon?: string
}[] = [
  {
    id: '1',
    img: 'https://storage.googleapis.com/opensea-prod.appspot.com/static/promocards/tezuka-promocard.png',
    label: 'First Category',
    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    url: '/categories/1',
    icon: 'https://storage.opensea.io/static/promocards/overseers-promocard.png',
  },
  {
    id: '2',
    img: 'https://storage.opensea.io/static/promocards/overseers-promocard.png',
    label: 'Second Category',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    url: '/categories/2',
    icon: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: '3',
    img: 'https://storage.opensea.io/static/promocards/hip-promocard.jpeg',
    label: 'Third Category',
    description:
      'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
    url: '/categories/3',
    icon: 'https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: '4',
    img: 'https://lh3.googleusercontent.com/jSniiLwosYg4YNa5ZJg4S115fP-vZ570m5Mrup117XaGUKiN2VW_vK4tYPXmaYJ1ku3pQqeMNdZWdXAvCXpH6QAckALelFdTGtgcDbY=s550',
    label: 'Fourth Category',
    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    url: '/categories/4',
  },
  {
    id: '5',
    img: 'https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'Fifth Category',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    url: '/categories/5',
  },
  {
    id: '6',
    img: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'Sixth Category',
    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    url: '/categories/6',
  },
]

const Categories: NextPage = () => (
  <Box mt="-12" bgColor="pageBg" pb={12}>
    <Image src="/images/categories-backdrop.png" height="250px" />
    <Heading fontSize={40} textAlign="center" mt={12}>
      Wiki Categories
    </Heading>
    <ToggleText
      my={8}
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non lobortis nisi. Etiam hendrerit eros vel mollis rutrum. Mauris eleifend et nunc eget placerat. Aenean quam dolor, faucibus sed dolor sed, sodales tempor dui. Quisque pulvinar diam eget tempor convallis. Phasellus ipsum tortor, sagittis nec rhoncus eu, cursus nec diam. Pellentesque condimentum, nulla at egestas egestas, lorem sem pellentesque mi, nec imperdiet enim metus eget felis."
    />
    <Divider />
    <Box mt={16}>
      <Heading fontSize={25} textAlign="center">
        Trending Wiki Categories
      </Heading>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        width="min(90%, 1200px)"
        mx="auto"
        my={12}
        gap={8}
      >
        {sampleCategories.map(category => (
          <CategoryCard
            key={category.id}
            coverImg={category.img}
            title={category.label}
            brief={category.description}
            categoryUrl={category.url}
            coverIcon={category.icon}
          />
        ))}
      </SimpleGrid>
    </Box>
  </Box>
)

export default Categories
