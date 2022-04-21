import React, { useEffect, useState } from 'react'

import { SwapWidget, darkTheme, lightTheme } from '@uniswap/widgets'
// import '@uniswap/widgets/dist/fonts.css'

import { useColorModeValue } from '@chakra-ui/color-mode'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers, providers } from 'ethers'

// Infura endpoint
const jsonRpcEndpoint = process.env.NEXT_PUBLIC_ENS_RPC
const jsonRpcProvider = new providers.JsonRpcProvider(jsonRpcEndpoint)
const defProvider = new ethers.providers.Web3Provider(jsonRpcProvider as any)

export const Uniswap = () => {
  const theme = useColorModeValue(lightTheme, darkTheme)

  const [provider, setProvider] = useState<any>(defProvider)

  useEffect(() => {
    const setProv = async () => {
      const ethProvider = await detectEthereumProvider()
      if (ethProvider) setProvider(ethProvider)
    }
    setProv()
  }, [])

  return (
    <div>
      <SwapWidget
        provider={provider}
        theme={theme}
        jsonRpcEndpoint={jsonRpcEndpoint}
      />
    </div>
  )
}
