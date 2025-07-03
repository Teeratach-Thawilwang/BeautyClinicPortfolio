import {ReactNode} from 'react'
import {ColorValue, GestureResponderEvent, ViewStyle} from 'react-native'

export type Props = {
  children?: ReactNode
  status: 'checked' | 'unchecked' | 'indeterminate'
  onPress: (e: GestureResponderEvent) => void
  label?: string
  color?: string
  rippleColor?: ColorValue
  testID?: string
  containerStyle?: ViewStyle | ViewStyle[]
}
