import React from 'react'

import { SwapWidget, darkTheme, lightTheme } from '@uniswap/widgets'
// import '@uniswap/widgets/dist/fonts.css'

import { useColorModeValue } from '@chakra-ui/color-mode'
import { provider } from '@/pages/_app'

// Infura endpoint
const jsonRpcEndpoint = process.env.NEXT_PUBLIC_ENS_RPC

export const Uniswap = () => {
  const theme = useColorModeValue(lightTheme, darkTheme)
  const uniswapProvider = provider()

  return (
    <div>
      <SwapWidget
        provider={uniswapProvider}
        theme={theme}
        jsonRpcEndpoint={jsonRpcEndpoint}
      />
    </div>
  )
}
