import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    background: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    indicator: {
      backgroundColor: theme.colors.onSurfaceDisabled,
      width: 40,
    },
    backdrop: {backgroundColor: 'transparent'},
  })
}
