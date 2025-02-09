import React, {useState} from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import {Button, MD3Theme, Text} from 'react-native-paper'

import ResponseModal from '@components/ResponseModal'
import TextInputSignForm from '@components/TextInputSignForm'
import {useTheme} from '@context-providers/ThemeProvider'
import useForgotPasswordForm, {ForgotPasswordFormData} from '@hooks/useForgotPasswordForm'
import AuthenticationService from '@services/AuthenticationService'

export default function ForgotPasswordForm() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {control, handleSubmit, errors} = useForgotPasswordForm()
  const [isModalShow, setIsModalShow] = useState(false)
  const isLoading = AuthenticationService.getIsLoading()
  const error = AuthenticationService.getError()

  async function onSubmit(data: ForgotPasswordFormData) {
    Keyboard.dismiss()
    setIsModalShow(true)
    await AuthenticationService.forgotPassword(data.email)
  }

  return (
    <View style={styles.container} onTouchStart={() => Keyboard.dismiss}>
      <Text variant='titleLarge' style={styles.title}>
        Forgot Password ?
      </Text>
      <Text variant='titleSmall' style={styles.text}>
        Enter your email. We will send you a link to reset password.
      </Text>
      <TextInputSignForm label='Email' name='email' icon='email-outline' control={control} error={errors.email} />
      <Button
        style={styles.button}
        labelStyle={{fontSize: theme.fonts.bodyLarge.fontSize}}
        mode='contained'
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}>
        Reset Password
      </Button>
      {error ? (
        <ResponseModal
          isVisible={isModalShow}
          isSuccess={false}
          title='Reset Password Failed.'
          text={error}
          onDismiss={() => setIsModalShow(false)}
        />
      ) : (
        <ResponseModal
          isVisible={isModalShow}
          isSuccess={true}
          title='Reset Password.'
          text='You will shortly receive an email with a link to reset your password'
          onDismiss={() => setIsModalShow(false)}
        />
      )}
    </View>
  )
}

function getStyles(theme: MD3Theme) {
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
    button: {
      borderRadius: 25,
      marginTop: 16,
      paddingVertical: 4,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
  })
}
