import React from 'react'
import {ScrollView} from 'react-native'

import GoogleSignInButton from '@components/GoogleSignInButton'
import InlineTextLink from '@components/InlineTextLink'
import LogoHeader from '@components/LogoHeader'
import TextDivider from '@components/TextDivider'
import {useNavigate} from '@hooks/CommonHooks'

import SignUpForm from './Components/SignUpForm'
import {getStyles} from './styles'

export default function SignUpScreen() {
  const styles = getStyles()
  const navigation = useNavigate()

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <LogoHeader />
      <SignUpForm />
      <TextDivider>or</TextDivider>
      <GoogleSignInButton />
      <InlineTextLink
        text='Do you have an account ?'
        linkText='Sign In'
        onPress={() => navigation.navigate('SignInScreen')}
        containerStyle={styles.inlineTextLink}
      />
    </ScrollView>
  )
}
