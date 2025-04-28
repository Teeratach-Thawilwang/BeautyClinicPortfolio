import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    content: {
      // paddingVertical: 10,
      paddingHorizontal: 0,
      // borderRadius: 10,
      // borderWidth: 1,
      // borderColor: theme.colors.surfaceVariant,
      // backgroundColor: theme.colors.surfaceContainerLow,
      flex: 1,
      gap: 10,
    },
  })
}
