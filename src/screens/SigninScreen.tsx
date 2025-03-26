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
  const signInButtonStyles = GoogleSignInButtonStyle()
  const forgotPasswordButtonStyles = ForgotPasswordButtonStyle()

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
        imageIcon={require('@assets/google_icon.png')}
        containerStyle={signInButtonStyles.container}
        contentStyle={signInButtonStyles.content}
        labelStyle={signInButtonStyles.label}
        imageIconStyle={signInButtonStyles.icon}>
        Sign In with Google
      </Button>
      <Button
        mode='text'
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
        containerStyle={forgotPasswordButtonStyles.container}
        labelStyle={forgotPasswordButtonStyles.label}>
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
