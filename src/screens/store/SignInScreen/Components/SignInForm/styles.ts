import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.colors.background,
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    text: {
      textAlign: 'center',
      fontWeight: 'light',
      marginBottom: 10,
      paddingHorizontal: 10,
      color: theme.colors.onSurfaceVariant,
    },
    textInput: {
      marginTop: 8,
    },
    buttonContainer: {
      marginTop: 20,
      paddingVertical: 4,
      height: 50,
      borderRadius: 25,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
    buttonLabel: {
      fontSize: theme.fontSize.label,
    },
  })
}
