import Color from 'color'
import {ColorValue, Platform} from 'react-native'

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

export function adjustColorBrightness(
  color: string | ColorValue,
  percent: number,
): string {
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

export function getFirstOrValue<T>(value: T | T[]): T {
  if (Array.isArray(value)) {
    return value[0]
  }
  return value
}

export function floorHalfHourDate(date: Date) {
  const minutes = date.getMinutes()
  if (minutes < 30) {
    date.setMinutes(0)
  } else {
    date.setMinutes(30)
  }
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

export function floorNumberToNearestMultiple(
  val: number,
  multiple: number,
): number {
  const multiply = Math.floor(val / multiple)
  return multiple * multiply
}

export function partition<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean,
): [T[], T[]] {
  return array.reduce<[T[], T[]]>(
    (acc, item, index, arr) => {
      if (predicate(item, index, arr)) {
        acc[0].push(item)
      } else {
        acc[1].push(item)
      }
      return acc
    },
    [[], []],
  )
}

export function swapArrayItem<T>(
  array: T[],
  fromIndex: number,
  toIndex: number,
): T[] {
  if (
    fromIndex < 0 ||
    fromIndex >= array.length ||
    toIndex < 0 ||
    toIndex >= array.length ||
    fromIndex === toIndex
  ) {
    return array
  }

  const newArray = [...array]
  const temp = newArray[fromIndex]
  newArray[fromIndex] = newArray[toIndex]
  newArray[toIndex] = temp
  return newArray
}
