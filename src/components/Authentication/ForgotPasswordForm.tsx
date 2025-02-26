import React, {useState} from 'react'
import {Keyboard, View} from 'react-native'
import {Text} from 'react-native-paper'

import ForgotPasswordResponse from '@components/Authentication/ForgotPasswordResponse'
import Button from '@components/Button'
import TextInputForm from '@components/TextInputForm'
import useForgotPasswordForm, {ForgotPasswordFormData} from '@hooks/useForgotPasswordForm'
import AuthenticationService from '@services/AuthenticationService'
import AuthFormStyle from '@styles/AuthFormStyle'

export default function ForgotPasswordForm() {
  const styles = AuthFormStyle()
  const {control, handleSubmit, errors} = useForgotPasswordForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  async function onSubmit(data: ForgotPasswordFormData) {
    Keyboard.dismiss()
    await AuthenticationService.forgotPassword(data.email)
    setIsModalVisible(true)
  }

  return (
    <View
      style={styles.container}
      onTouchStart={() => Keyboard.dismiss}
      testID='forgot-password-form'>
      <Text variant='titleLarge' style={styles.title}>
        Forgot Password ?
      </Text>
      <Text variant='titleSmall' style={styles.text}>
        Enter your email. We will send you a link to reset password.
      </Text>
      <TextInputForm
        label='Email'
        name='email'
        icon='email-outline'
        control={control}
        error={errors.email}
      />
      <Button
        useLoading={true}
        onPress={handleSubmit(onSubmit)}
        styles={{container: styles.buttonContainer, label: styles.buttonLabel}}>
        Reset Password
      </Button>
      <ForgotPasswordResponse
        isVisible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
      />
    </View>
  )
}
