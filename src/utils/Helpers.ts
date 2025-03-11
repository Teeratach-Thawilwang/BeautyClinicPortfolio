import {Platform} from 'react-native'

export function getPlatFormOS() {
  return Platform.OS
}

export function getResponsiveScreen(width: number) {
  if (width < 600) {
    return 'MOBILE'
  }
  if (width >= 600 && width < 900) {
    return 'TABLET'
  }
  return 'DESKTOP'
}
