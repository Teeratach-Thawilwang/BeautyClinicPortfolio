import {ReactNode} from 'react'
import {KeyboardTypeOptions, TextStyle, ViewStyle} from 'react-native'

export type LabelStyle = {
  fontSize?: number
  fontWeight?: TextStyle['fontWeight']
  marginLeft?: number
}

export type ColorStyle = {
  defaultColor?: string
  focusColor?: string
  errorColor?: string
  disabledColor?: string
}

export type Props = {
  label?: string
  value?: string | number
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  mode?: 'flat' | 'outlined' | 'labelTop'
  multiline?: boolean
  keyboardType?: KeyboardTypeOptions
  placeholder?: string
  icon?: string
  right?: ReactNode
  error?: string
  secureText?: boolean
  clearText?: boolean
  disabled?: boolean
  containerStyle?: ViewStyle
  labelStyle?: LabelStyle
  colorStyle?: ColorStyle
}
