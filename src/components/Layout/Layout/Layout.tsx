import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import Navbar from '@/components/Layout/Navbar/Navbar'
import Footer from '@/components/Layout/Footer/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Stack justify="space-between" minH="100vh" spacing={0}>
    <Navbar />
    <Box as="main" pt={20}>
      {children}
    </Box>
    <Footer />
  </Stack>
)

export default Layout
