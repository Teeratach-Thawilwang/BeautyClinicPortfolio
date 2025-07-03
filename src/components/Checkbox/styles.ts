import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
    checkboxContainer: {
      marginLeft: 'auto',
      marginRight: 0,
    },
  })
}
