import React from 'react'
import {Controller} from 'react-hook-form'
import {Keyboard, View} from 'react-native'
import {Text} from 'react-native-paper'

import Button from '@components/Button'
import ResponseModal from '@components/ResponseModal'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {
  SignInFormData,
  useSignInForm,
  useSignInMutation,
} from '@hooks/store/SignInHooks'

import {getStyles} from './styles'

export default function SignInForm() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {control, handleSubmit, errors} = useSignInForm()
  const {mutate, isPending, error, isModalVisible, setIsModalVisible} =
    useSignInMutation()

  function onSubmit(formData: SignInFormData) {
    Keyboard.dismiss()
    mutate(formData)
  }

  return (
    <View
      testID='sign-in-form'
      style={styles.container}
      onTouchStart={() => Keyboard.dismiss}>
      <Text variant='titleLarge' style={styles.title}>
        Hi, Welcome Back!
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
      <Button
        isLoading={isPending}
        onPress={handleSubmit(onSubmit)}
        containerStyle={styles.buttonContainer}
        labelStyle={styles.buttonLabel}>
        Sign In
      </Button>
      {error?.message ? (
        <ResponseModal
          visible={isModalVisible}
          title='Sign In Failed.'
          text={error.message}
          imageSource={require('@assets/images/failed_icon.png')}
          onDismiss={() => setIsModalVisible(false)}
        />
      ) : null}
    </View>
  )
}
