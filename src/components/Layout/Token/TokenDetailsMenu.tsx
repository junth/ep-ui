import React from 'react'
import { Menu, MenuButton, MenuList,MenuItem} from '@chakra-ui/react'
import { RiMore2Fill } from 'react-icons/ri'
const TokenDetailsMenu = ({token}:{token: string|undefined}) => {
  return (
    <Menu placement="left-start">
      <MenuButton>
          <RiMore2Fill color="color" fontSize="20" fontWeight="bold" />
      </MenuButton>
      <MenuList boxShadow="xl">
        <MenuItem>Add {token} token to Metamask</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default TokenDetailsMenu