import React from 'react'
import {
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
  HStack,
} from '@chakra-ui/react'
import { RiArrowRightSLine } from 'react-icons/ri'
import Link from '@/components/Elements/Link/Link'
import { NavItem } from '@/types/NavItemType'

const MobileNavItem = ({
  navItem,
  handleClick,
}: {
  navItem: NavItem
  handleClick: (item: NavItem) => void
}) => {
  const { onToggle } = useDisclosure()

  return (
    <Stack direction="column" spacing={4} onClick={onToggle}>
      <Flex
        py={5}
        as={Link}
        href={navItem.href}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
        fontSize="lg"
      >
        <HStack onClick={() => handleClick(navItem)}>
          <Icon
            cursor="pointer"
            fontSize="4xl"
            color="color"
            fontWeight={600}
            as={navItem.icon}
            pr={3}
          />

          <Text fontWeight={600} color="color">
            {navItem.label}
          </Text>
        </HStack>
        {navItem.label !== 'wallet' && <RiArrowRightSLine />}
      </Flex>
    </Stack>
  )
}

export default MobileNavItem
