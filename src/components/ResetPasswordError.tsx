import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, MD3Theme, Text} from 'react-native-paper'

import TextLinkInline from '@components/TextLinkInline'
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
      <View style={styles.space} />
      <TextLinkInline
        text='Try again ? '
        linkText='Forgot Password'
        onPress={() => navigation.replace('ForgotPasswordScreen')}
      />
      <Button
        style={styles.button}
        labelStyle={{fontSize: theme.fonts.bodyLarge.fontSize}}
        mode='contained'
        onPress={() => navigation.replace('TabScreen', {screen: 'HomeScreen'})}>
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
    space: {
      flexGrow: 1,
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    errorText: {
      textAlign: 'center',
    },
    button: {
      borderRadius: 25,
      marginBottom: 25,
      paddingVertical: 4,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
  })
}
