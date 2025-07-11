import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 20,
      marginBottom: 20,
      alignItems: 'center',
    },
    title: {
      marginTop: 20,
      color: theme.colors.primary,
      fontSize: theme.fontSize.subtitle,
      fontWeight: 'bold',
    },
    amountText: {
      marginTop: 10,
      marginBottom: 5,
      color: theme.colors.primary,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    text: {
      marginTop: 5,
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
    buttonContainer: {
      marginTop: 20,
      borderRadius: 50,
    },
  })
}
