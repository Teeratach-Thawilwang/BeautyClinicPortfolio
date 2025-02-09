import React, {useState} from 'react'
import {Controller} from 'react-hook-form'
import {Keyboard, StyleSheet, View} from 'react-native'
import {Button, MD3Theme, Text} from 'react-native-paper'

import ResponseModal from '@components/ResponseModal'
import TextInputSignForm from '@components/TextInputSignForm'
import {useTheme} from '@context-providers/ThemeProvider'
import useSignUpForm, {SignupFormData} from '@hooks/useSignupForm'
import AuthenticationService from '@services/AuthenticationService'

export default function SignupForm() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {control, handleSubmit, errors} = useSignUpForm()
  const [isModalShow, setIsModalShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const error = AuthenticationService.getError()

  async function onSubmit(formData: SignupFormData) {
    Keyboard.dismiss()
    setIsLoading(true)
    await AuthenticationService.signupWithEmail(formData.email, formData.password).finally(() => {
      setIsModalShow(true)
      setIsLoading(false)
    })
  }

  return (
    <View style={styles.container} onTouchStart={() => Keyboard.dismiss}>
      <Text variant='titleLarge' style={styles.title}>
        Create Account
      </Text>
      <TextInputSignForm
        label='Your Name'
        name='name'
        icon='ion-person-outline'
        control={control}
        error={errors.name}
      />
      <TextInputSignForm label='Email' name='email' icon='email-outline' control={control} error={errors.email} />
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
        Create Account
      </Button>
      {error ? (
        <ResponseModal
          isVisible={isModalShow}
          isSuccess={false}
          title='Sign up Failed.'
          text={error}
          onDismiss={() => setIsModalShow(false)}
        />
      ) : (
        <ResponseModal
          isVisible={isModalShow}
          isSuccess={true}
          title='Sign up successfully.'
          text='Please check your email inbox for a confirmation link to activate your account.'
          onDismiss={() => setIsModalShow(false)}>
          <Controller
            control={control}
            name='email'
            render={({field: {value}}) => (
              <View style={styles.resendContainer}>
                <Text variant='titleSmall' style={styles.resendText}>
                  Haven't received an email yet ?
                </Text>
                <Button
                  mode='text'
                  style={styles.resendButton}
                  labelStyle={styles.resendLabelButton}
                  onPress={async () => await AuthenticationService.resendConfirmSignup(value)}>
                  Resend
                </Button>
              </View>
            )}
          />
        </ResponseModal>
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
