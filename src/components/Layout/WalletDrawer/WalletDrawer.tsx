import React, { memo, RefObject, useState } from 'react'
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  MenuButton,
  Menu,
  HStack,
  Image,
  MenuList,
  MenuItem,
  Spinner,createStandaloneToast
} from '@chakra-ui/react'
import { useAccount, useBalance } from 'wagmi'
import { FocusableElement } from '@chakra-ui/utils'
import {
  RiArrowLeftSLine,
  RiLogoutBoxRLine,
  RiRefreshLine,
} from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import shortenAccount from '@/utils/shortenAccount'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { walletsLogos } from '@/data/WalletData'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { fetchWalletBalance } from '@/utils/fetchWalletBalance'
import config from '@/config'
import { useDispatch } from 'react-redux'
import { updateWalletDetails } from '@/store/slices/user-slice'

const toastProperties = {
  description: 'Account successfully refreshed',
  status: 'success',
  duration: 4000,
  isClosable: true,
  position: "bottom-right",
  variant: "left-accent"
}

type WalletDrawerType = {
  isOpen: boolean
  onClose: () => void
  finalFocusRef: RefObject<FocusableElement>
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}

const WalletDrawer = ({
  isOpen,
  onClose,
  finalFocusRef,
  setHamburger,
}: WalletDrawerType) => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })
  const [accountRefreshLoading, setAccountRefreshLoader] = useState<boolean>(false)
  const toast = createStandaloneToast()
  const [, getBalance] = useBalance()
  const address = accountData ? accountData.address : null
  const dispatch = useDispatch()

  const handleNavigation = () => {
    onClose()
    setHamburger(true)
  }
  const handleAccountRefresh = () => {
    setAccountRefreshLoader(true)
    if(address){
      fetchWalletBalance(getBalance, [
        {
          addressOrName: address,
          token: config.iqAddress,
        },
        {
          addressOrName: address,
        },
      ]).then(response => {
        dispatch(updateWalletDetails(response))
      })
    }
    setTimeout(()=>{
      setAccountRefreshLoader(false)
      toast(toastProperties)
    }, 3000)
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      finalFocusRef={finalFocusRef}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader mt={20}>
          <Flex
            w="full"
            cursor="pointer"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            mb="2"
          >
            <HStack flex="1">
              <Box
                onClick={handleNavigation}
                display={{ sm: 'block', md: 'none' }}
              >
                <RiArrowLeftSLine size="30" />
              </Box>
              <DisplayAvatar accountData={accountData} />
              <Menu>
                <MenuButton pl={1} fontSize="md" fontWeight={600}>
                  My Wallet {accountData && <ChevronDownIcon />}
                </MenuButton>
                {accountData && (
                  <MenuList>
                    <MenuItem py={3}>
                      <Image
                        boxSize="24px"
                        borderRadius="full"
                        src={`/images/${walletsLogos[0]}`}
                        alt="MetaMask"
                        mr={3}
                      />
                      <Text fontSize="small" fontWeight="bold">
                        MetaMask
                      </Text>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={disconnect}
                      py={3}
                      icon={<RiLogoutBoxRLine size={25} />}
                    >
                      <Text fontSize="small" fontWeight="bold">
                        Logout
                      </Text>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleAccountRefresh}  closeOnSelect={false} py={3} icon={<RiRefreshLine size={25} />}>
                      <Flex>
                        <Text flex="1" fontSize="small" fontWeight="bold">
                          Refresh
                        </Text>
                        {
                          accountRefreshLoading && <Spinner size="sm" />
                        }
                      </Flex>
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            </HStack>
            {accountData && (
              <Text color="gray.500" textAlign="center" fontSize="medium">
                {accountData?.ens?.name
                  ? `${accountData.ens?.name}`
                  : shortenAccount(accountData?.address)}
              </Text>
            )}
          </Flex>
        </DrawerHeader>
        <Divider />
        <DrawerBody shadow="sm">
          <Connectors />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default memo(WalletDrawer)
