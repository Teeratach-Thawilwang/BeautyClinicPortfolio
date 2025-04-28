import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      overflow: 'hidden',
    },
    devider: {
      borderColor: theme.colors.outlineVariant,
    },
  })
}
