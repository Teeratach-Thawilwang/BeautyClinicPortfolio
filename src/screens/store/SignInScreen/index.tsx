import React from 'react'
import {ScrollView} from 'react-native'

import Button from '@components/Button'
import GoogleSignInButton from '@components/GoogleSignInButton'
import InlineTextLink from '@components/InlineTextLink'
import LogoHeader from '@components/LogoHeader'
import TextDivider from '@components/TextDivider'
import {useNavigate} from '@hooks/CommonHooks'

import SignInForm from './Components/SignInForm'
import {getStyles} from './styles'

export default function SignInScreen() {
  const styles = getStyles()
  const navigation = useNavigate()

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <LogoHeader />
      <SignInForm />
      <TextDivider>or</TextDivider>
      <GoogleSignInButton />
      <Button
        mode='text'
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
        containerStyle={styles.forgotPasswordContainer}
        labelStyle={styles.forgotPasswordLabel}>
        Forgot password ?
      </Button>
      <InlineTextLink
        text="Don't have an account yet ?"
        linkText='Sign Up'
        onPress={() => navigation.navigate('SignUpScreen')}
      />
    </ScrollView>
  )
}
