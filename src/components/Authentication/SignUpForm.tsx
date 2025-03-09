import React, {useState} from 'react'
import {Keyboard, View} from 'react-native'
import {Text} from 'react-native-paper'

import SignUpResponse from '@components/Authentication/SignUpResponse'
import Button from '@components/Button'
import TextInputForm from '@components/TextInputForm'
import useSignUpForm, {SignUpFormData} from '@hooks/useSignUpForm'
import AuthenticationService from '@services/AuthenticationService'
import AuthFormStyle from '@styles/AuthFormStyle'

export default function SignUpForm() {
  const styles = AuthFormStyle()
  const {control, handleSubmit, errors} = useSignUpForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  async function onSubmit(formData: SignUpFormData) {
    Keyboard.dismiss()
    await AuthenticationService.signupWithEmail(
      formData.email,
      formData.password,
      formData.name,
    )
    setIsModalVisible(true)
  }

  return (
    <View
      testID='sign-up-form'
      style={styles.container}
      onTouchStart={() => Keyboard.dismiss}>
      <Text variant='titleLarge' style={styles.title}>
        Create Account
      </Text>
      <TextInputForm
        label='Your Name'
        name='name'
        icon='ion-person-outline'
        control={control}
        error={errors.name}
      />
      <TextInputForm
        label='Email'
        name='email'
        icon='email-outline'
        control={control}
        error={errors.email}
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
        styles={{container: styles.buttonContainer, label: styles.buttonLabel}}>
        Create Account
      </Button>
      <SignUpResponse
        isVisible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        control={control}
      />
    </View>
  )
}
