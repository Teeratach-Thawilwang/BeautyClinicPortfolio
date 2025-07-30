import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 10,
    },
    carousel: {
      borderRadius: 5,
    },
    paginateContainer: {
      marginTop: 5,
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
