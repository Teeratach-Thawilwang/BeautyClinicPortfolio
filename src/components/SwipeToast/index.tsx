import {Gesture, GestureDetector} from 'react-native-gesture-handler'

import React, {useEffect} from 'react'
import {Text, View} from 'react-native'
import {Icon} from 'react-native-paper'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {ToastConfigParams} from 'react-native-toast-message'

import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

import {getStyles} from './styles'
import {Props} from './types'

export default function SwipeToast({
  text1,
  text1Style,
  text2,
  text2Style,
  type,
  isVisible,
  hide,
  props,
}: ToastConfigParams<Props>) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {color, icon} = getColorAndIcon(type, theme)
  const isDragging = useSharedValue(false)
  const offsetX = useSharedValue(0)
  const offsetY = useSharedValue(0)
  const thresholdX = 10
  const thresholdY = 10
  const visibleDuration = 2000

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDragging.value) {
        hide()
      }
    }, visibleDuration)

    return () => clearTimeout(timeout)
  }, [isVisible])

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = true
    })
    .onUpdate(e => {
      offsetX.value = e.translationX
      offsetY.value = e.translationY
    })
    .onEnd(e => {
      const dismissX = Math.abs(e.translationX) > thresholdX
      const dismissY = Math.abs(e.translationY) > thresholdY
      if (dismissX || dismissY) {
        runOnJS(hide)()
      }
    })
    .onFinalize(() => {
      isDragging.value = false
      offsetX.value = withTiming(0)
      offsetY.value = withTiming(0)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offsetX.value}, {translateY: offsetY.value}],
  }))

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View>
          <Icon
            source={props.icon ?? icon}
            size={props.iconStyle?.size ?? 26}
            color={props.iconStyle?.color ?? color}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text1, text1Style]} numberOfLines={1}>
            {text1}
          </Text>
          {text2 ? (
            <Text
              style={[styles.text2, text2Style]}
              numberOfLines={1}
              ellipsizeMode='tail'
              lineBreakMode='tail'>
              {text2}
            </Text>
          ) : null}
        </View>
      </Animated.View>
    </GestureDetector>
  )
}

function getColorAndIcon(type: string, theme: AdaptiveMD3Theme) {
  switch (type) {
    case 'success':
      return {
        color: theme.colors.primary,
        icon: 'ion-checkmark-circle',
      }
    case 'info':
      return {
        color: theme.colors.secondary,
        icon: 'ion-information-circle',
      }
    case 'warning':
      return {
        color: theme.colors.quaternary,
        icon: 'ion-warning',
      }
    case 'error':
      return {
        color: theme.colors.error,
        icon: 'ion-information-circle',
      }
    default:
      return {
        color: theme.colors.onSurface,
        icon: 'ion-information-circle',
      }
  }
}
