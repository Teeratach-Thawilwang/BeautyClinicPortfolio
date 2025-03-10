import React from 'react'
import {ScrollView} from 'react-native'

import SignInForm from '@components/Authentication/SignInForm'
import Button from '@components/Button'
import InlineTextLink from '@components/InlineTextLink'
import LogoHeader from '@components/LogoHeader'
import TextDivider from '@components/TextDivider'
import {googleSignInHandler} from '@hooks/CommonHooks'
import {useNavigate} from '@hooks/CommonHooks'
import ForgotPasswordButtonStyle from '@styles/ForgotPasswordButton.style'
import GoogleSignInButtonStyle from '@styles/GoogleSignInButton.style'
import getStyles from '@styles/Screen.style'

export default function SignInScreen() {
  const navigation = useNavigate()

  return (
    <ScrollView
      style={getStyles().container}
      keyboardShouldPersistTaps='handled'>
      <LogoHeader />
      <SignInForm />
      <TextDivider text='or' />
      <Button
        useLoading={true}
        onPress={() => googleSignInHandler(navigation)}
        icon={require('@assets/google_icon.png')}
        styles={GoogleSignInButtonStyle()}>
        Sign In with Google
      </Button>
      <Button
        mode='text'
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
        styles={ForgotPasswordButtonStyle()}>
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
