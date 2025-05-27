import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    title: {
      marginBottom: 10,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.title,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      marginBottom: 10,
      paddingHorizontal: 10,
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
      fontWeight: 'light',
      textAlign: 'center',
    },
    textInput: {
      marginTop: 8,
    },
    buttonContainer: {
      borderRadius: 25,
      marginTop: 20,
      paddingVertical: 4,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
    buttonLabel: {
      fontSize: theme.fontSize.label,
    },
  })
}
