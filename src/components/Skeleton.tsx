import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'

type SkeletonHooks = {
  mode: 'shimmer' | 'blink'
  colors: string[]
  animatedStyle: {
    transform: {
      translateX: `${number}%`
    }[]
    backgroundColor: string
  }
}

type SkeletonProps = {
  children?: ReactNode
  skeletonHooks: SkeletonHooks
  style: ViewStyle | ViewStyle[]
  useView?: boolean
}

export default function Skeleton({
  children,
  skeletonHooks,
  style,
  useView,
}: SkeletonProps) {
  const {mode, colors, animatedStyle} = skeletonHooks

  if (useView) {
    return <View style={[StyleSheet.flatten(style)]}>{children}</View>
  }

  if (mode === 'shimmer') {
    return (
      <View
        style={[
          StyleSheet.flatten(style),
          {
            ...StyleSheet.absoluteFillObject,
            overflow: 'hidden',
            position: 'relative',
          },
        ]}>
        {children}
        <Animated.View
          style={[
            animatedStyle,
            {
              ...StyleSheet.absoluteFillObject,
              position: 'absolute',
              zIndex: -1,
            },
          ]}>
          <LinearGradient
            colors={colors}
            start={{x: 0.35, y: 0}}
            end={{x: 0.65, y: 0}}
            style={{
              width: '300%',
              height: '100%',
            }}
          />
        </Animated.View>
      </View>
    )
  }

  return (
    <Animated.View style={[StyleSheet.flatten(style), animatedStyle]}>
      {children}
    </Animated.View>
  )
}
