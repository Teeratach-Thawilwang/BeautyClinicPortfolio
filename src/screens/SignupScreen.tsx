import React from 'react'
import {ScrollView} from 'react-native'

import SignUpForm from '@components/Authentication/SignUpForm'
import Button from '@components/Button'
import InlineTextLink from '@components/InlineTextLink'
import LogoHeader from '@components/LogoHeader'
import TextDivider from '@components/TextDivider'
import {googleSignInHandler} from '@hooks/CommonHooks'
import {useNavigate} from '@hooks/CommonHooks'
import GoogleSignInButtonStyle from '@styles/GoogleSignInButton.style'
import getStyles from '@styles/Screen.style'

export default function SignUpScreen() {
  const navigation = useNavigate()

  return (
    <ScrollView
      style={getStyles().container}
      keyboardShouldPersistTaps='handled'>
      <LogoHeader />
      <SignUpForm />
      <TextDivider text='or' />
      <Button
        useLoading={true}
        onPress={() => googleSignInHandler(navigation)}
        icon={require('@assets/google_icon.png')}
        styles={GoogleSignInButtonStyle()}>
        Sign In with Google
      </Button>
      <InlineTextLink
        text='Do you have an account ?'
        linkText='Sign In'
        onPress={() => navigation.navigate('SignInScreen')}
      />
    </ScrollView>
  )
}
