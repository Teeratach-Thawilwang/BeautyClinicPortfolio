import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    buttonContainer: {
      height: 40,
      minWidth: 80,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    buttonLabel: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
    activeButtonContainer: {
      height: 40,
      minWidth: 80,
      backgroundColor: theme.colors.primary,
    },
    activeButtonLabel: {
      color: theme.colors.onPrimary,
      fontSize: theme.fontSize.body,
    },
  })
}
