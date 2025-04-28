import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      overflow: 'hidden',
    },
    content: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderWidth: 0,
      flex: 1,
      flexDirection: 'row',
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 100,
    },
    detail: {
      marginLeft: 10,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    name: {
      fontWeight: 'bold',
      fontSize: theme.fontSize.label,
      color: theme.colors.onSurface,
    },
    email: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
  })
}
