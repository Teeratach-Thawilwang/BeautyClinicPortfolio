import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme, width: number) {
  return StyleSheet.create({
    container: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: width - 20,
      height: 250,
      resizeMode: 'contain',
      backgroundColor: theme.colors.primary,
    },
    paginateContainer: {
      marginTop: 10,
      marginBottom: 10,
      gap: 10,
    },
    paginateDot: {
      width: 25,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.surfaceVariant,
    },
    paginateActiveDot: {
      overflow: 'hidden',
      backgroundColor: theme.colors.primary,
    },
  })
}
