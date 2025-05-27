import {StyleSheet} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

export default () => {
  const {theme} = useTheme()
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
    buttonContainer: {
      borderRadius: 25,
      marginTop: 16,
      paddingVertical: 4,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
    buttonLabel: {
      fontSize: theme.fonts.bodyLarge.fontSize,
    },
  })
}

export function SignUpResponseStyle() {
  const {theme} = useTheme()
  return StyleSheet.create({
    resendContainer: {
      marginTop: 10,
    },
    resendText: {
      textAlign: 'center',
      color: theme.colors.onSurfaceVariant,
    },
    resendButton: {
      width: 120,
      margin: 0,
      padding: 0,
      alignSelf: 'center',
    },
    resendLabelButton: {
      margin: 0,
      padding: 0,
      color: theme.colors.primary,
    },
  })
}
