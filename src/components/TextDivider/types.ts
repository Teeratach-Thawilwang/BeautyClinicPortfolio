import {ViewStyle} from 'react-native'

export type Props = {
  children: string
  containerStyle?: ViewStyle
  textColor?: string
  dividerStyle?: {height: number; borderColor: string}
}
