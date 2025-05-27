import {TextStyle, ViewStyle} from 'react-native'

export type Props = {
  title: string
  icon: string
  onPress: () => void
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
  iconStyle?: {width: number; color: string}
}
