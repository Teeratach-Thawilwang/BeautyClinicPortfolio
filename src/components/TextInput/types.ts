import {TextStyle, ViewStyle} from 'react-native'

export type LabelStyle = {
  fontSize?: number
  fontWeight?: TextStyle['fontWeight']
}

export type ColorStyle = {
  defaultColor?: string
  focusColor?: string
  errorColor?: string
  disabledColor?: string
}

export type Props = {
  label: string
  value: string | number
  onChange: (value: string) => void
  mode?: 'flat' | 'outlined' | 'labelTop'
  placeholder?: string
  icon?: string
  error?: string
  secureText?: boolean
  disabled?: boolean
  containerStyle?: ViewStyle
  labelStyle?: LabelStyle
  colorStyle?: ColorStyle
}
