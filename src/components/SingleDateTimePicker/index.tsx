import React from 'react'
import DatePicker from 'react-native-date-picker'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

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
  modal,
  title,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  minuteInterval,
}: Props) {
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
      modal={modal}
      title={title}
      cancelText={cancelText}
      confirmText={confirmText}
      onCancel={onCancel}
      onConfirm={onConfirm}
      minuteInterval={minuteInterval}
      is24hourSource='locale'
      locale={process.env.LOCALE}
    />
  )
}
