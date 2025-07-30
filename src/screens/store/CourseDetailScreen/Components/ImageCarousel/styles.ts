import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      borderRadius: 5,
      overflow: 'hidden',
    },
    paginateContainer: {
      marginVertical: 10,
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
