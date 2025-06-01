import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    card: {
      margin: 20,
      paddingBottom: 10,
      width: 320,
      height: 400,
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 10,
      alignSelf: 'center',
      overflow: 'hidden',
    },
  })
}
