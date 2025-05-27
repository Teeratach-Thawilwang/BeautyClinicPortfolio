import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      width: 100,
      height: 100,
      borderRadius: 8,
      overflow: 'hidden',
    },
    button: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.primary,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: theme.fontSize.body,
      fontWeight: '500',
      color: theme.colors.onPrimary,
    },
    icon: {
      width: 50,
      color: theme.colors.onPrimary,
    },
  })
}
