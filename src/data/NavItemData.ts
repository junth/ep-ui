import {
  RiGridFill,
  RiPaletteFill,
  RiFootballFill,
  RiSettings5Fill,
  RiAccountCircleFill,
  RiCompass3Fill,
  RiBarChartFill,
  RiFoldersFill,
  RiAddBoxFill,
  RiWallet2Line,
} from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'

export const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    label: 'Explore',
    href: '#',
    hasSubItem: true,
    icon: RiCompass3Fill,
    subItem: [
      {
        label: 'All Categories',
        href: '/categories',
        hasImage: true,
        icon: RiGridFill,
      },
      {
        label: 'NFTs',
        href: '/categories/nfts',
        hasImage: true,
        icon: RiPaletteFill,
      },
      {
        label: 'Crypto Celebrities',
        href: '/categories/crypto-celebrities',
        hasImage: true,
        icon: RiFootballFill,
      },
    ],
  },
  {
    id: 2,
    label: 'Activity',
    href: '/activity',
    icon: RiBarChartFill,
  },
  {
    id: 3,
    label: 'Resources',
    href: '#',
    hasSubItem: true,
    icon: RiFoldersFill,
    subItem: [
      {
        label: 'Help Center',
        href: 'https://learn.everipedia.org',
        hasImage: false,
      },
      {
        label: 'About us',
        href: '/static/about',
        hasImage: false,
      },
    ],
  },
  {
    id: 4,
    label: 'Create Wiki',
    href: '/create',
    icon: RiAddBoxFill,
  },
]

export const NAV_ICON: NavItem = {
  label: 'Account',
  id: 100,
  href: '#',
  hasSubItem: true,
  subItem: [
    {
      label: 'Profile',
      href: '#',
      hasImage: true,
      icon: RiAccountCircleFill,
    },
    {
      label: 'My Wikis',
      href: '#',
      hasImage: true,
      icon: RiGridFill,
    },
    {
      label: 'Settings',
      href: '/settings',
      hasImage: true,
      icon: RiSettings5Fill,
    },
  ],
}

export const mobileWalletDetails: NavItem = {
  label: 'Wallet',
  href: '#',
  id: 1234,
  icon: RiWallet2Line,
}
