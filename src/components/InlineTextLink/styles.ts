import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme.colors.onSurfaceVariant,
      flexShrink: 1,
      fontWeight: 'normal',
      fontSize: theme.fontSize.label,
    },
    linkText: {
      padding: 0,
      marginHorizontal: 0,
      color: theme.colors.primary,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
  })
}
