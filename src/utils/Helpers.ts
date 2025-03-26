import Color from 'color'
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

export function getDeviceTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function adjustColorBrightness(color: string, percent: number): string {
  const colorInstance = Color(color)
  const adjustedColor =
    percent > 0
      ? colorInstance.lighten(percent / 100)
      : colorInstance.darken(Math.abs(percent) / 100)

  return adjustedColor.hex()
}
