import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      width: '100%',
      gap: 5,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    note: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
    card: {
      alignItems: 'center',
      backgroundColor: '#36877F',
      borderRadius: 10,
      height: 100,
      justifyContent: 'center',
    },
    contentContainer: {
      padding: 10,
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
    },
  })
}
