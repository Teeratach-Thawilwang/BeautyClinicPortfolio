import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchCount: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    filterButtonContainer: {
      marginLeft: 'auto',
      marginRight: 0,
      width: 65,
      borderRadius: 5,
      borderColor: theme.colors.onSurfaceVariant,
    },
    filterButtonLabel: {
      color: theme.colors.onSurface,
    },
    filterButtonIcon: {
      width: 20,
      color: theme.colors.onSurface,
    },
  })
}
