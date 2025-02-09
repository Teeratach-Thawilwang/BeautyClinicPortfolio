import React, {useState} from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import {Button, MD3Theme, Text} from 'react-native-paper'

import ResponseModal from '@components/ResponseModal'
import TextInputSignForm from '@components/TextInputSignForm'
import {useTheme} from '@context-providers/ThemeProvider'
import {useEffectScreen, useNavigate} from '@hooks/CommonHooks'
import useResetPasswordForm, {ResetPasswordFormData} from '@hooks/useResetPasswordForm'
import AuthenticationService from '@services/AuthenticationService'

export default function ResetPasswordForm({email, setUpdated}: {email: string; setUpdated: () => void}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {control, handleSubmit, errors} = useResetPasswordForm(email)
  const navigation = useNavigate()
  const [isModalShow, setIsModalShow] = useState(false)
  const isLoading = AuthenticationService.getIsLoading()
  const error = AuthenticationService.getError()

  useEffectScreen(() => {
    setIsModalShow(false)
  }, [])

  async function onSubmit(formData: ResetPasswordFormData) {
    Keyboard.dismiss()
    await AuthenticationService.updatePassword(formData.email, formData.password).then(async ({success}) => {
      if (success) {
        setUpdated()
      }
      setIsModalShow(true)
    })
  }

  return (
    <View style={styles.container} onTouchStart={() => Keyboard.dismiss}>
      <Text variant='titleLarge' style={styles.title}>
        Create new password
      </Text>
      <TextInputSignForm
        label='Email'
        name='email'
        icon='email-outline'
        control={control}
        error={errors.email}
        disabled
      />
      <TextInputSignForm
        label='Password'
        name='password'
        icon='lock-outline'
        control={control}
        error={errors.password}
        secureTextEntry={true}
      />
      <TextInputSignForm
        label='Confirm Password'
        name='confirmPassword'
        icon='lock-outline'
        control={control}
        error={errors.confirmPassword}
        secureTextEntry={true}
      />
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
          title='Update Failed.'
          text={error}
          buttonText='Continue'
          onButtonPress={() => navigation.replace('ForgotPasswordScreen')}
        />
      ) : (
        <ResponseModal
          isVisible={isModalShow}
          isSuccess={true}
          title='Successfully.'
          text='Your password has been updated.'
          buttonText='Continue'
          onButtonPress={() => navigation.replace('TabScreen', {screen: 'HomeScreen'})}
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
    button: {
      borderRadius: 25,
      marginTop: 16,
      paddingVertical: 4,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
  })
}
