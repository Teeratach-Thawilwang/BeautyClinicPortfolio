import {ReactNode} from 'react'
import {StyleProp, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'

export type Props = {
  children: ReactNode
  index?: number | 'full'
  snapPoints?: string[] | number[]
  backgroundStyle?: StyleProp<ViewStyle>
  indicatorStyle?: StyleProp<ViewStyle>
  backdropStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
}
