import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {MD3Theme} from 'react-native-paper'

import ForgotPasswordButton from '@components/ForgotPasswordButton'
import GoogleSigninButton from '@components/GoogleSigninButton'
import SignFormLogo from '@components/SignFormLogo'
import SigninForm from '@components/SigninForm'
import TextDivider from '@components/TextDivider'
import TextLinkInline from '@components/TextLinkInline'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

export default function SigninScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <SignFormLogo />
      <SigninForm />
      <TextDivider text='or' />
      <GoogleSigninButton />
      <ForgotPasswordButton />
      <TextLinkInline
        text="Don't have an account yet ?"
        linkText='Sign Up'
        onPress={() => navigation.navigate('SignupScreen')}
      />
    </ScrollView>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
  })
}
