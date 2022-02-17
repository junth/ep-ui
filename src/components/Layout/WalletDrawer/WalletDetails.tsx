import React from 'react'
import { HStack, Image, Text } from '@chakra-ui/react'
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
        <Text mr={3} as="strong" fontWeight="extrabold">
          {balance}
        </Text>
        <RiMore2Fill color="color" fontSize="20" fontWeight="bold" />
      </HStack>
    </>
  </WalletDetailsWrapper>
)

export default WalletDetails
