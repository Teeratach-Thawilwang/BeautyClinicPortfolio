import React from 'react'
import {ScrollView} from 'react-native'

import SignUpForm from '@components/Authentication/SignUpForm'
import Button from '@components/Button'
import InlineTextLink from '@components/InlineTextLink'
import LogoHeader from '@components/LogoHeader'
import TextDivider from '@components/TextDivider'
import {googleSignInHandler} from '@hooks/CommonHooks'
import {useNavigate} from '@hooks/CommonHooks'
import GoogleSignInButtonStyle from '@styles/GoogleSignInButtonStyle'
import ScreenStyle from '@styles/ScreenStyle'

export default function SignUpScreen() {
  const navigation = useNavigate()

  return (
    <ScrollView style={ScreenStyle().container} keyboardShouldPersistTaps='handled'>
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
