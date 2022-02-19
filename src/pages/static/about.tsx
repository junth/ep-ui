import React from 'react'
import { Box } from '@chakra-ui/react'
import AboutHero from '@/components/About/AboutHero'
import AboutFeatures from '@/components/About/AboutFeatures'
import AboutAsSeenIn from '@/components/About/AboutAsSeenIn'

const About = () => (
  <Box maxW="7xl" mx="auto" mt={4}>
    <AboutHero />
    <Box px={8}>
      <AboutFeatures />
      <AboutAsSeenIn />
    </Box>
  </Box>
)

export default About
