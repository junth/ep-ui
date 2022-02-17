import { extendTheme, ThemeConfig, ColorMode } from '@chakra-ui/react'

import { components } from './components'
import { foundations } from './foundations'
import { semanticTokens } from './semantic-tokens'

export const storageKey = 'chakra-ui-color-mode'
let colorModeInLocalStorage
if (typeof window !== 'undefined') {
  colorModeInLocalStorage = localStorage.getItem(storageKey) as ColorMode
}
const useSystemColorMode = !colorModeInLocalStorage

const config: ThemeConfig = {
  useSystemColorMode,
  initialColorMode: 'light',
  cssVarPrefix: 'chakra',
}

export const theme = {
  components,
  config,
  ...foundations,
  semanticTokens,
}

export default extendTheme(theme)
