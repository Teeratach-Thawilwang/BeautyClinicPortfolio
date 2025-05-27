import React, {useState} from 'react'
import {Keyboard, View} from 'react-native'
import {Text} from 'react-native-paper'

import ResetPasswordResponse from '@components/Authentication/ResetPasswordResponse'
import Button from '@components/Button'
import TextInputForm from '@components/TextInputForm'
import {useEffectScreen} from '@hooks/CommonHooks'
import useResetPasswordForm, {
  ResetPasswordFormData,
} from '@hooks/useResetPasswordForm'
import AuthenticationService from '@services/AuthenticationService'
import getStyles from '@styles/AuthForm.style'

type ResetPasswordFormProps = {
  email: string
  onSuccess: () => void
}

export default function ResetPasswordForm({
  email,
  onSuccess,
}: ResetPasswordFormProps) {
  const styles = getStyles()
  const {control, handleSubmit, errors} = useResetPasswordForm(email)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffectScreen(() => {
    setIsModalVisible(false)
  }, [])

  async function onSubmit(formData: ResetPasswordFormData) {
    Keyboard.dismiss()
    const {success} = await AuthenticationService.updatePassword(
      formData.email,
      formData.password,
    )
    if (success) {
      onSuccess()
    }
    setIsModalVisible(true)
  }

  return (
    <View
      style={styles.container}
      onTouchStart={() => Keyboard.dismiss}
      testID='reset-password-form'>
      <Text variant='titleLarge' style={styles.title}>
        Create new password
      </Text>
      <TextInputForm
        label='Email'
        name='email'
        icon='email-outline'
        control={control}
        error={errors.email}
        disabled
      />
      <TextInputForm
        label='Password'
        name='password'
        icon='lock-outline'
        control={control}
        error={errors.password}
        secureTextEntry={true}
      />
      <TextInputForm
        label='Confirm Password'
        name='confirmPassword'
        icon='lock-outline'
        control={control}
        error={errors.confirmPassword}
        secureTextEntry={true}
      />
      <Button
        useLoading={true}
        onPress={handleSubmit(onSubmit)}
        containerStyle={styles.buttonContainer}
        labelStyle={styles.buttonLabel}>
        Reset Password
      </Button>
      <ResetPasswordResponse isVisible={isModalVisible} />
    </View>
  )
}
