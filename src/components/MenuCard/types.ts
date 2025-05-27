import {ReactNode} from 'react'
import {StyleProp, ViewStyle} from 'react-native'

export type Props = {
  children: ReactNode
  useDivider?: boolean
  containerStyle?: StyleProp<ViewStyle>
  dividerStyle?: StyleProp<ViewStyle>
}
