import React, {useState} from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import {Button, MD3Theme, Text} from 'react-native-paper'

import ResponseModal from '@components/ResponseModal'
import TextInputSignForm from '@components/TextInputSignForm'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import useSigninForm, {SigninFormData} from '@hooks/useSigninForm'
import AuthenticationService from '@services/AuthenticationService'

export default function SigninForm() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {control, handleSubmit, errors} = useSigninForm()
  const [isModalShow, setIsModalShow] = useState(false)
  const isLoading = AuthenticationService.getIsLoading()
  const error = AuthenticationService.getError()

  async function onSubmit(formData: SigninFormData) {
    Keyboard.dismiss()
    await AuthenticationService.signinWithEmail(formData.email, formData.password).then(({success}) => {
      if (success) {
        navigation.navigate('TabScreen', {screen: 'HomeScreen'})
      } else {
        setIsModalShow(true)
      }
    })
  }

  return (
    <View style={styles.container} onTouchStart={() => Keyboard.dismiss}>
      <Text variant='titleLarge' style={styles.title}>
        Hi, Welcome Back!
      </Text>
      <TextInputSignForm label='Email' name='email' icon='email-outline' control={control} error={errors.email} />
      <TextInputSignForm
        label='Password'
        name='password'
        icon='lock-outline'
        control={control}
        error={errors.password}
        secureTextEntry={true}
      />
      <Button
        style={styles.button}
        labelStyle={{fontSize: theme.fonts.bodyLarge.fontSize}}
        mode='contained'
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}>
        Sign In
      </Button>
      {error ? (
        <ResponseModal
          isVisible={isModalShow}
          isSuccess={false}
          title='Sign in Failed.'
          text={error}
          onDismiss={() => setIsModalShow(false)}
        />
      ) : null}
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
