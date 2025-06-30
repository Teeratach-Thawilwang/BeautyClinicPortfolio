import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    text: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
      textAlign: 'center',
    },
    textSeparate: {
      width: 10,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      textAlign: 'center',
    },
    sliderContainer: {
      maxWidth: '100%',
      height: 20,
      minHeight: 20,
    },
    track: {
      backgroundColor: theme.colors.onSurfaceVariant,
    },
    selected: {
      backgroundColor: theme.colors.primary,
    },
    marker: {
      backgroundColor: theme.colors.primary,
    },
  })
}
