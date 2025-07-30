import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

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
    imageContainer: {
      padding: 5,
      borderRadius: 100,
      backgroundColor: theme.dark ? theme.colors.primary : 'transparent',
    },
    image: {
      width: 45,
      height: 45,
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
