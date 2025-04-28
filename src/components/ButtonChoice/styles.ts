import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    button: {
      flexGrow: 1,
      borderWidth: 0,
      borderRadius: 0,
      borderLeftWidth: 1,
      borderColor: theme.colors.outline,
    },
    buttonLeft: {
      borderLeftWidth: 0,
    },
    buttonColorActive: {
      backgroundColor: theme.colors.primary,
    },
    label: {
      color: theme.colors.primary,
    },
    labelActive: {
      color: theme.colors.onPrimary,
    },
    labelDisabled: {
      color: theme.colors.onSurfaceDisabled,
    },
  })
}
