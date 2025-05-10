import {TextStyle, ViewStyle} from 'react-native'

export type Choice = {
  label: string
  value: string | number
}

export type Props = {
  data: Choice[]
  onChange: (values: Choice['value'][]) => void
  initialValue?: Choice['value'][]
  multiple?: boolean
  containerStyle?: ViewStyle
  buttonContainerStyle?: ViewStyle
  buttonLabelStyle?: TextStyle
  activeButtonContainerStyle?: ViewStyle
  activeButtonLabelStyle?: TextStyle
}
