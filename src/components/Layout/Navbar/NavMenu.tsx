import React from 'react'
import {
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from '@chakra-ui/react'
import Link from '@/components/Elements/Link/Link'
import { NavItem } from '@/types/NavItemType'

interface NavMenuType {
  visibleMenu: number | null
  children?: React.ReactNode
  navItem: NavItem
  setVisibleMenu: React.Dispatch<React.SetStateAction<number | null>>
  labelIsIcon?: boolean
  label: React.ReactNode
}
const NavMenu = ({
  visibleMenu,
  navItem,
  setVisibleMenu,
  children,
  labelIsIcon,
  label,
}: NavMenuType) => (
  <Menu placement="bottom" isOpen={visibleMenu === navItem.id}>
    <MenuButton
      pr={4}
      fontSize="lg"
      fontWeight={600}
      color="linkColor"
      _hover={{
        textDecoration: 'none',
        color: 'linkHoverColor',
      }}
      whiteSpace="nowrap"
      onMouseEnter={() => setVisibleMenu(navItem.id)}
      onClick={() => setVisibleMenu(visibleMenu ? null : navItem.id)}
    >
      {label}
    </MenuButton>
    {navItem.hasSubItem && (
      <MenuList
        bg="subMenuBg"
        onMouseEnter={() => setVisibleMenu(navItem.id)}
        mt={!labelIsIcon ? 4 : 1.5}
      >
        {navItem.subItem?.map((item, key) => (
          <React.Fragment key={key}>
            <MenuItem minH="48px" bg="subMenuBg">
              {item.hasImage && (
                <Icon
                  cursor="pointer"
                  fontSize="4xl"
                  color="linkColor"
                  fontWeight={600}
                  as={item.icon}
                  pr={3}
                />
              )}
              <Link
                href={item.href}
                fontSize="md"
                fontWeight={600}
                color="linkColor"
                _hover={{
                  textDecoration: 'none',
                  color: 'linkHoverColor',
                }}
              >
                {item.label}
              </Link>
            </MenuItem>
            {navItem.subItem?.length !== key + 1 && <Divider />}
          </React.Fragment>
        ))}
        {children}
      </MenuList>
    )}
  </Menu>
)

export default NavMenu
