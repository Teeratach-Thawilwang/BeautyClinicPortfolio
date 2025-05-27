import React from 'react'
import {StyleSheet, View} from 'react-native'
import {MD3Theme, Text} from 'react-native-paper'

import Button from '@components/Button'
import InlineTextLink from '@components/InlineTextLink'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

export default function ResetPasswordError({error}: {error: string}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Reset Password
      </Text>
      <Text variant='titleSmall' style={styles.errorText}>
        {error}
      </Text>
      <View style={{flexGrow: 1}} />
      <InlineTextLink
        text='Try again ? '
        linkText='Forgot Password'
        onPress={() => navigation.replace('ForgotPasswordScreen')}
      />
      <Button
        onPress={() => navigation.replace('TabScreen', {screen: 'HomeScreen'})}
        styles={{container: styles.buttonContainer, label: styles.buttonLabel}}>
        Home
      </Button>
    </View>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginBottom: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    errorText: {
      textAlign: 'center',
    },
    buttonContainer: {
      borderRadius: 25,
      marginBottom: 25,
      paddingVertical: 4,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
    buttonLabel: {
      fontSize: theme.fonts.bodyLarge.fontSize,
    },
  })
}
