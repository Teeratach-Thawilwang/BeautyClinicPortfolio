import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 10,
      flexDirection: 'row',
    },
    backIcon: {
      marginLeft: -10,
      marginRight: 0,
      marginVertical: 0,
    },
    textInputContainer: {
      flexGrow: 1,
      flexShrink: 1,
    },
  })
}
