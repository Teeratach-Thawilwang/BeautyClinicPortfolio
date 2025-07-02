import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 10,
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
      resizeMode: 'contain',
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
