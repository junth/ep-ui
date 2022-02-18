import { Pseudos, SemanticValue } from '@chakra-ui/react'

export type SemanticTokens = Partial<
  Record<string, Record<string, SemanticValue<keyof Pseudos>>>
>

export const semanticTokens: SemanticTokens = {
  colors: {
    brandBackground: {
      default: 'primary',
      _dark: 'brand.900',
    },
    dimColor: {
      default: '#0000002a',
    },
    linkColor: {
      default: 'gray.600',
      _dark: 'grey.200',
    },
    linkHoverColor: {
      default: 'gray.800',
      _dark: 'gray.400',
    },
    subMenuBg: {
      default: 'white',
      _dark: 'gray.800',
    },
    pageBg: {
      default: 'gray.100',
      _dark: 'gray.700',
    },
    hoverBg: {
      default: 'gray.100',
      _dark: 'gray.600',
    },
    homeCardBg: {
      default: 'white',
      _dark: 'gray.700',
    },
    cardBg: {
      default: 'white',
      _dark: 'gray.600',
    },
    mobileMenuBorderColor: {
      default: 'gray.300',
      _dark: 'gray.700',
    },
    walletDrawerBorderColor: {
      default: 'gray.300',
      _dark: 'gray.600',
    },
    borderColorHover: {
      default: 'gray.400',
      _dark: 'gray.700',
    },
  },
}
