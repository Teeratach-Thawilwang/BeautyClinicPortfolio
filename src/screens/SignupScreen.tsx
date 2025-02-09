import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {MD3Theme} from 'react-native-paper'

import GoogleSigninButton from '@components/GoogleSigninButton'
import SignFormLogo from '@components/SignFormLogo'
import SignupForm from '@components/SignupForm'
import TextDivider from '@components/TextDivider'
import TextLinkInline from '@components/TextLinkInline'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

export default function SignupScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <SignFormLogo />
      <SignupForm />
      <TextDivider text='or' />
      <GoogleSigninButton />
      <TextLinkInline
        text='Do you have an account ?'
        linkText='Sign In'
        onPress={() => navigation.navigate('SigninScreen')}
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
