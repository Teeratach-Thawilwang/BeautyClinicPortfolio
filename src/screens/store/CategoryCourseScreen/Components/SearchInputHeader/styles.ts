import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      marginRight: 35,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
      flexGrow: 1,
      textAlign: 'center',
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
