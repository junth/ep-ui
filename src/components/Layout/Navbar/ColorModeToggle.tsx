import { Flex, Icon, MenuItem, Switch, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const ColorModeIcon = colorMode === 'light' ? FaMoon : FaSun

  return (
    <MenuItem minH="48px" bg="subMenuBg">
      <Icon
        cursor="pointer"
        fontSize="4xl"
        color="linkColor"
        fontWeight={600}
        as={ColorModeIcon}
        pr={3}
      />
      <Flex fontSize="md" fontWeight="semibold" color="linkColor" flex="auto">
        <span>Night Mode</span>
        <Switch
          ml="auto"
          isChecked={colorMode === 'dark'}
          onChange={toggleColorMode}
        />
      </Flex>
    </MenuItem>
  )
}
