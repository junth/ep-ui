import React from 'react'
import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import { RiMore2Fill } from 'react-icons/ri'
import { tokenDetails } from '@/data/WalletData'
import WalletDetailsWrapper from './WalletDetailsWrapper'

const WalletDetails = ({
  symbol,
  balance,
}: {
  symbol: string | undefined
  balance: string | null
}) => (
  <WalletDetailsWrapper hasHover={false}>
    <>
      <HStack flex="1">
        <Image
          boxSize="23px"
          mr={3}
          src={`/images/${symbol && tokenDetails[symbol].logo}`}
        />
        <Text as="strong" fontWeight="extrabold">
          {symbol}
        </Text>
      </HStack>

      <HStack>
        <VStack align="flex-end">
          <Text fontWeight="extrabold">
            {balance}
          </Text>
          <Text mr={3} color="GrayText" fontSize="sm" fontWeight="bold">
            ${balance} USD
          </Text>
        </VStack>
      
        <RiMore2Fill color="color" fontSize="20" fontWeight="bold" />
      </HStack>
    </>
  </WalletDetailsWrapper>
)

export default WalletDetails
