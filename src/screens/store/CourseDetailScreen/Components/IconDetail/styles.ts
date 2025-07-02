import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: 25,
    },
    detailItemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: theme.colors.surfaceVariant,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconRound: {
      width: 25,
      height: 25,
      borderRadius: 5,
      backgroundColor: theme.colors.onSurface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconPrice: {
      width: 25,
      height: 25,
      borderRadius: 50,
      backgroundColor: theme.colors.onSurface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
      fontWeight: 'bold',
    },
    note: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.note,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  })
}
