import React from 'react'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'

import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

export default function SingleDateTimePicker({
  onChange,
  mode = 'time',
  initialDate,
  minimumDate,
  maximumDate,
  width,
  height = 150,
  backgroundColor,
  dividerColor,
}: {
  onChange: (date: Date) => void
  mode?: 'date' | 'time' | 'datetime'
  initialDate?: Date
  minimumDate?: Date
  maximumDate?: Date
  width?: number
  height?: number
  backgroundColor?: string
  dividerColor?: string
}) {
  const {theme, schema} = useTheme()
  const defaultWidth = width ?? (mode == 'datetime' ? 280 : 220)
  const styles = getStyles(theme, defaultWidth, height)

  return (
    <DatePicker
      style={{
        ...styles.container,
        backgroundColor: backgroundColor ?? styles.container.backgroundColor,
      }}
      dividerColor={dividerColor ?? theme.colors.onSurface}
      theme={schema}
      mode={mode}
      date={initialDate ?? new Date()}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      onDateChange={onChange}
    />
  )
}

function getStyles(theme: AdaptiveMD3Theme, width: number, height: number) {
  return StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
  })
}
