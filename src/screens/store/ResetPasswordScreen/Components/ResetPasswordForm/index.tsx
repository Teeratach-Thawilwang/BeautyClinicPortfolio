import React from 'react'
import {Controller} from 'react-hook-form'
import {Keyboard, Text, View} from 'react-native'

import Button from '@components/Button'
import ResponseModal from '@components/ResponseModal'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {useFocusEffect, useNavigate} from '@hooks/CommonHooks'
import {
  ResetPasswordFormData,
  useResetPasswordForm,
  useResetPasswordMutation,
} from '@hooks/ResetPasswordHooks'

import {getStyles} from './styles'

type ResetPasswordFormProps = {
  email: string
  onSuccess: () => void
}

export default function ResetPasswordForm({
  email,
  onSuccess,
}: ResetPasswordFormProps) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {control, handleSubmit, errors} = useResetPasswordForm(email)
  const {mutate, isPending, error, isModalVisible, setIsModalVisible} =
    useResetPasswordMutation(onSuccess)

  useFocusEffect(() => {
    setIsModalVisible(false)
  }, [])

  function onSubmit(formData: ResetPasswordFormData) {
    Keyboard.dismiss()
    mutate(formData)
  }

  return (
    <View
      style={styles.container}
      onTouchStart={() => Keyboard.dismiss}
      testID='reset-password-form'>
      <Text style={styles.title}>Create new password</Text>
      <Controller
        control={control}
        name='email'
        render={({field: {onChange, value}}) => (
          <TextInput
            mode='outlined'
            label='Email'
            value={String(value)}
            disabled={true}
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
            secureText={true}
            containerStyle={styles.textInput}
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
            secureText={true}
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
          title='Update Failed.'
          text={error.message}
          imageSource={require('@assets/images/failed_icon.png')}
          buttonText='Continue'
          onButtonPress={() => navigation.replace('ForgotPasswordScreen')}
        />
      ) : (
        <ResponseModal
          visible={isModalVisible}
          title='Successfully.'
          text='Your password has been updated.'
          imageSource={require('@assets/images/successfully_icon.png')}
          buttonText='Continue'
          onButtonPress={() =>
            navigation.replace('BottomTabScreens', {screen: 'Home'})
          }
        />
      )}
    </View>
  )
}
