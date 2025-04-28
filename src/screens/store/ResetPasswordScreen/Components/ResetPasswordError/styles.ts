import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginBottom: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    title: {
      marginBottom: 10,
      textAlign: 'center',
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    errorText: {
      textAlign: 'center',
      fontSize: theme.fontSize.body,
    },
    space: {
      flexGrow: 1,
    },
    buttonContainer: {
      borderRadius: 25,
      marginBottom: 25,
      paddingVertical: 4,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
    buttonLabel: {
      fontSize: theme.fontSize.label,
    },
  })
}
