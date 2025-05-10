import {ReactNode} from 'react'
import {ViewStyle} from 'react-native'

export type Props = {
  children: ReactNode
  mobileColumns: number[]
  tabletColumns: number[]
  isPadding?: boolean
  containerStyle?: ViewStyle
  rowStyle?: ViewStyle
}
