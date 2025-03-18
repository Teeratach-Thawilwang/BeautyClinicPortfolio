import {Platform} from 'react-native'

export function getPlatFormOS() {
  return Platform.OS
}

export function getResponsiveScreen(width: number) {
  if (width < 768) {
    return 'MOBILE'
  }
  if (width >= 768 && width < 992) {
    return 'TABLET'
  }
  return 'DESKTOP'
}
