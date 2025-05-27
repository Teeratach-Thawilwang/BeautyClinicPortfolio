import {useEffect} from 'react'
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import {adjustColorBrightness} from '@utils/Helpers'

export function useSkeleton(
  color: string,
  mode: 'shimmer' | 'blink' = 'shimmer',
  direction: 'forward' | 'backward' = 'forward',
  duration: number = 1500,
  adjustColorPercent: number = 40,
) {
  const translateXPosition = -195
  const initialShirmmerValue = direction == 'forward' ? translateXPosition : 0
  const initialBlinkValue = 0
  const shimmerValue = useSharedValue(initialShirmmerValue)
  const blinkValue = useSharedValue(initialBlinkValue)
  const adjustedColor = adjustColorBrightness(color, adjustColorPercent)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: mode === 'shimmer' ? `${shimmerValue.value}%` : '0%'},
      ],
      backgroundColor:
        mode == 'shimmer'
          ? color
          : interpolateColor(blinkValue.value, [0, 1], [color, adjustedColor]),
    }
  })

  useEffect(() => {
    if (mode === 'blink') {
      blinkValue.value = initialBlinkValue
      blinkValue.value = withRepeat(withTiming(1, {duration}), -1, true)
    }
    if (mode === 'shimmer') {
      const {start, stop} =
        direction == 'forward'
          ? {start: translateXPosition, stop: 0}
          : {start: 0, stop: translateXPosition}
      shimmerValue.value = start
      shimmerValue.value = withRepeat(withTiming(stop, {duration}), -1, false)
    }
  }, [mode, direction, duration])

  return {
    mode: mode,
    colors: [color, adjustedColor, color],
    animatedStyle: animatedStyle,
  }
}
