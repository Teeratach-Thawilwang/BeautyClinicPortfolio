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
  onChangeInject?: (value: string) => string
  mode?: 'flat' | 'outlined' | 'labelTop'
  multiline?: boolean
  keyboardType?: KeyboardTypeOptions
  maxLength?: number
  placeholder?: string
  icon?: string
  right?: ReactNode
  error?: string
  secureText?: boolean
  clearText?: boolean
  disabled?: boolean
  useDebounceDelay?: number
  containerStyle?: ViewStyle
  labelStyle?: LabelStyle
  colorStyle?: ColorStyle
  errorStyle?: TextStyle
}
