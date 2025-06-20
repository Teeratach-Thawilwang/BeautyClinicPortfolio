import React from 'react'
import {Controller} from 'react-hook-form'
import {Keyboard, ScrollView, Text, View} from 'react-native'

import Button from '@components/Button'
import LogoHeader from '@components/LogoHeader'
import ResponseModal from '@components/ResponseModal'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {
  ForgotPasswordFormData,
  useForgotPasswordForm,
  useForgotPasswordMutation,
} from '@hooks/store/ForgotPasswordHooks'

import {getStyles} from './styles'

export default function ForgotPasswordScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {control, handleSubmit, errors} = useForgotPasswordForm()
  const {mutate, isPending, error, isModalVisible, setIsModalVisible} =
    useForgotPasswordMutation()

  function onSubmit(data: ForgotPasswordFormData) {
    Keyboard.dismiss()
    mutate(data.email)
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <LogoHeader />
      <View onTouchStart={() => Keyboard.dismiss} testID='forgot-password-form'>
        <Text style={styles.title}>Forgot Password ?</Text>
        <Text style={styles.text}>
          Enter your email. We will send you a link to reset password.
        </Text>
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
        <Button
          isLoading={isPending}
          onPress={handleSubmit(onSubmit)}
          containerStyle={styles.buttonContainer}
          labelStyle={styles.buttonLabel}>
          Reset Password
        </Button>
        {error?.message ? (
          <ResponseModal
            visible={isModalVisible}
            title='Reset Password Failed.'
            text={error.message}
            imageSource={require('@assets/images/failed_icon.png')}
            onDismiss={() => setIsModalVisible(false)}
          />
        ) : (
          <ResponseModal
            visible={isModalVisible}
            title='Reset Password.'
            text='You will shortly receive an email with a link to reset your password.'
            imageSource={require('@assets/images/successfully_icon.png')}
            onDismiss={() => setIsModalVisible(false)}
          />
        )}
      </View>
    </ScrollView>
  )
}
