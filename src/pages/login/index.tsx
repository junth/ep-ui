import React, { useEffect, useState } from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

const Login = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { data } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (data?.address) {
      if (router.query.from) {
        router.push(`${router.query.from}`)
      } else {
        router.push('/')
      }
    }
  }, [data?.address, router])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  return (
    <Container centerContent mt="8" mb="24">
      <Box minW="min(90%, 300px)">
        <Heading mb={4} fontWeight="extrabold" fontSize={23}>
          Connect your wallet
        </Heading>
        <Connectors />
      </Box>
    </Container>
  )
}

export default Login
