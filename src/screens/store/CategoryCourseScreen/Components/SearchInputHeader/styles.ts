import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 10,
    },
    textInputContainer: {
      flexGrow: 1,
      flexShrink: 1,
    },
  })
}
