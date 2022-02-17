import React from 'react'
import {
  Heading,
  LinkBox,
  LinkOverlay,
  Box,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { sampleCategories } from '@/pages/categories'
import { Image } from '../Elements/Image/Image'

const CategoriesList = () => (
  <Box>
    <Text align="center" fontWeight="semibold" fontSize="2xl" mb={8}>
      Browse by category
    </Text>
    <SimpleGrid
      maxW="1050px"
      mx="auto"
      columns={[1, 2, 3]}
      spacingX={6}
      spacingY={12}
    >
      {sampleCategories.map(category => (
        <LinkBox
          key={category.id}
          _hover={{ boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px' }}
          cursor="pointer"
          borderWidth="1px"
          borderColor="#2222222a"
          bgColor="homeCardBg"
          borderRadius="12px"
          overflow="hidden"
        >
          <Image bgColor="#0000002a" src={category.img} h="180px" w="100%" />
          <NextLink href={category.url} passHref>
            <LinkOverlay>
              <Heading w="100%" textAlign="center" py={4} size="md">
                {category.label}
              </Heading>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
      ))}
    </SimpleGrid>
  </Box>
)

export default CategoriesList
