import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(
  theme: AdaptiveMD3Theme,
  width: number,
  height: number,
) {
  return StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
  })
}
