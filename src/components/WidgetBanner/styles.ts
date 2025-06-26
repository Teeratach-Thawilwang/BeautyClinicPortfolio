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
  })
}
