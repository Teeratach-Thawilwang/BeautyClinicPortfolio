import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 20,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    titleButton: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
    carousel: {
      marginTop: 10,
    },
    carouselContent: {
      gap: 10,
    },
  })
}
