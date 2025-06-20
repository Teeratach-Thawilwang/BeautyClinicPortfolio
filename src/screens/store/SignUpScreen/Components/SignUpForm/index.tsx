import React from 'react'
import {Controller} from 'react-hook-form'
import {Keyboard, Text, View} from 'react-native'

import Button from '@components/Button'
import ResponseModal from '@components/ResponseModal'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {
  SignUpFormData,
  useSignUpForm,
  useSignUpMutation,
} from '@hooks/store/SignUpHooks'
import AuthService from '@services/AuthService'

import {getStyles} from './styles'

export default function SignUpForm() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {control, handleSubmit, errors} = useSignUpForm()
  const {mutate, isPending, error, isModalVisible, setIsModalVisible} =
    useSignUpMutation()

  function onSubmit(formData: SignUpFormData) {
    Keyboard.dismiss()
    mutate(formData)
  }

  return (
    <View testID='sign-up-form' onTouchStart={() => Keyboard.dismiss}>
      <Text style={styles.title}>Create Account</Text>
      <Controller
        control={control}
        name='name'
        render={({field: {onChange, value}}) => (
          <TextInput
            mode='outlined'
            label='Your Name'
            value={String(value)}
            icon='ion-person-outline'
            onChange={onChange}
            error={errors.name?.message}
            containerStyle={styles.textInput}
          />
        )}
      />
      <Controller
        control={control}
        name='email'
        render={({field: {onChange, value}}) => (
          <TextInput
            mode='outlined'
            label='Email'
            value={String(value)}
            icon='email-outline'
            onChange={onChange}
            error={errors.email?.message}
            containerStyle={styles.textInput}
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        render={({field: {onChange, value}}) => (
          <TextInput
            mode='outlined'
            label='Password'
            value={String(value)}
            icon='lock-outline'
            onChange={onChange}
            error={errors.password?.message}
            containerStyle={styles.textInput}
            secureText={true}
          />
        )}
      />
      <Controller
        control={control}
        name='confirmPassword'
        render={({field: {onChange, value}}) => (
          <TextInput
            mode='outlined'
            label='Confirm Password'
            value={String(value)}
            icon='lock-outline'
            onChange={onChange}
            error={errors.confirmPassword?.message}
            containerStyle={styles.textInput}
            secureText={true}
          />
        )}
      />
      <Button
        isLoading={isPending}
        onPress={handleSubmit(onSubmit)}
        containerStyle={styles.buttonContainer}
        labelStyle={styles.buttonLabel}>
        Create Account
      </Button>
      {error?.message ? (
        <ResponseModal
          visible={isModalVisible}
          title='Sign In Failed.'
          text={error.message}
          imageSource={require('@assets/images/failed_icon.png')}
          onDismiss={() => setIsModalVisible(false)}
        />
      ) : (
        <ResponseModal
          visible={isModalVisible}
          title='Sign up successfully.'
          text='Please check your email inbox for a confirmation link to activate your account.'
          imageSource={require('@assets/images/successfully_icon.png')}
          onDismiss={() => setIsModalVisible(false)}>
          <Controller
            control={control}
            name='email'
            render={({field: {value}}) => (
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Haven't received an email yet ?
                </Text>
                <Button
                  mode='text'
                  useLoading={true}
                  containerStyle={styles.resendButtonContainer}
                  labelStyle={styles.resendButtonLabel}
                  onPress={async () =>
                    await AuthService.resendConfirmSignup(value)
                  }>
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
