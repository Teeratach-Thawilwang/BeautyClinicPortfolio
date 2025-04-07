import Color from 'color'
import {Alert, Platform} from 'react-native'

export function getPlatFormOS() {
  return Platform.OS
}

export function getAndroidVersion() {
  return Number(Platform.Version)
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

export function createArrayRange(
  start: number,
  stop: number,
  step: number,
  useStopPoint?: boolean,
) {
  return Array.from(
    {length: Math.ceil((stop - start) / step) + (useStopPoint ? 1 : 0)},
    (_, i) => start + i * step,
  )
}

export function alertFileSizeExceed(
  fileSize: number,
  maxSize: number,
  message?: string,
) {
  if (fileSize > maxSize) {
    Alert.alert(message ?? 'Image size is above the file size limit')
    return
  }
}
