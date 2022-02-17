import { IconType } from 'react-icons/lib'

export interface NavItem {
  label: string
  href: string
  hasSubItem?: boolean
  icon?: IconType
  subItem?: SubNavItem[]
  id: number
}

export interface SubNavItem {
  label: string
  href: string
  hasImage: boolean
  icon?: IconType
}
