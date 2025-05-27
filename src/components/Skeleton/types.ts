import {ReactNode} from 'react'
import {ViewStyle} from 'react-native'

export type SkeletonHooks = {
  mode: 'shimmer' | 'blink'
  colors: string[]
  animatedStyle: {
    transform: {
      translateX: `${number}%`
    }[]
    backgroundColor: string
  }
}

export type Props = {
  children?: ReactNode
  skeletonHooks: SkeletonHooks
  style?: ViewStyle | ViewStyle[]
  isLoading?: boolean
}
