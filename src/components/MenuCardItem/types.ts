import {StyleProp, TextStyle, ViewStyle} from 'react-native'

export type Props = {
  label: string
  labelStyle?: StyleProp<TextStyle>
  icon?: string
  iconStyle?: {width: number; color: string}
  containerStyle?: StyleProp<ViewStyle>
  rightElement?: React.ReactNode
  onPress?: () => void
}
