import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
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
    resendContainer: {
      marginTop: 10,
    },
    resendText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
      textAlign: 'center',
    },
    resendButtonContainer: {
      margin: 0,
      padding: 0,
      alignSelf: 'center',
    },
    resendButtonLabel: {
      margin: 0,
      padding: 0,
      color: theme.colors.primary,
      fontSize: theme.fontSize.label,
    },
  })
}
