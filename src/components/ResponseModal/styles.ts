import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    modal: {
      padding: 20,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 20,
    },
    icon: {
      width: 80,
      height: 80,
      alignSelf: 'center',
    },
    title: {
      marginVertical: 10,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.headline,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      marginBottom: 10,
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
      fontWeight: 'light',
      textAlign: 'center',
    },
    buttonContainer: {
      borderRadius: 25,
      marginTop: 10,
      paddingVertical: 4,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
    buttonLabel: {
      fontSize: theme.fontSize.label,
    },
  })
}
