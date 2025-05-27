import {TextStyle, ViewStyle} from 'react-native'

export type Props = {
  text: string
  linkText: string
  onPress: (() => void) | (() => Promise<void>)
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  linkTextStyle?: TextStyle
}
