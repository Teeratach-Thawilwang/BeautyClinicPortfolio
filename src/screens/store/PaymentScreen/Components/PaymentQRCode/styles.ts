import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 20,
      alignItems: 'center',
    },
    image: {
      width: 296,
      height: 420,
      backgroundColor: theme.colors.surfaceVariant,
      resizeMode: 'cover',
    },
    amountText: {
      marginTop: 20,
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
  })
}
