import React, { useState } from 'react'
import { HStack } from '@chakra-ui/react'
import { NAV_ITEMS } from '@/data/NavItemData'
import { NavMenu } from '@/components/Layout/Navbar'

const DesktopNav = () => {
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)
  return (
    <HStack spacing={4} onMouseLeave={() => setVisibleMenu(null)}>
      {NAV_ITEMS.map(navItem => (
        <NavMenu
          key={navItem.id}
          navItem={navItem}
          setVisibleMenu={setVisibleMenu}
          visibleMenu={visibleMenu}
          label={navItem.label}
        />
      ))}
    </HStack>
  )
}

export default DesktopNav
