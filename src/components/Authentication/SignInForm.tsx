import React, {useState} from 'react'
import {Keyboard, View} from 'react-native'
import {Text} from 'react-native-paper'

import SignInResponse from '@components/Authentication/SignInResponse'
import Button from '@components/Button'
import TextInputForm from '@components/TextInputForm'
import {useNavigate} from '@hooks/CommonHooks'
import useSignInForm, {SignInFormData} from '@hooks/useSignInForm'
import AuthenticationService from '@services/AuthenticationService'
import AuthFormStyle from '@styles/AuthFormStyle'

export default function SignInForm() {
  const styles = AuthFormStyle()
  const navigation = useNavigate()
  const {control, handleSubmit, errors} = useSignInForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  async function onSubmit(formData: SignInFormData) {
    Keyboard.dismiss()
    const {success} = await AuthenticationService.signinWithEmail(
      formData.email,
      formData.password,
    )
    if (success) {
      navigation.navigate('TabScreen', {screen: 'HomeScreen'})
    } else {
      setIsModalVisible(true)
    }
  }

  return (
    <View
      testID='sign-in-form'
      style={styles.container}
      onTouchStart={() => Keyboard.dismiss}>
      <Text variant='titleLarge' style={styles.title}>
        Hi, Welcome Back!
      </Text>
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
      <Button
        useLoading={true}
        onPress={handleSubmit(onSubmit)}
        styles={{container: styles.buttonContainer, label: styles.buttonLabel}}>
        Sign In
      </Button>
      <SignInResponse
        isVisible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
      />
    </View>
  )
}
