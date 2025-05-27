import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backdrop,
    },
    card: {
      margin: 20,
      padding: 20,
      backgroundColor: theme.colors.surfaceContainerLow,
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 10,
    },
    title: {
      marginVertical: 10,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.subtitle,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      textAlign: 'center',
    },
    buttonContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
    },
    cancelButtonContainer: {
      backgroundColor: theme.colors.surfaceContainerHighest,
      borderRadius: 5,
      flex: 1,
    },
    cancelButtonLabel: {
      color: theme.colors.onSurface,
    },
    confirmButtonContainer: {
      borderRadius: 5,
      flex: 1,
    },
  })
}
