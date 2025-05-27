import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

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
