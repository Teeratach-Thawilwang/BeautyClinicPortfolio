import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
  })
}
