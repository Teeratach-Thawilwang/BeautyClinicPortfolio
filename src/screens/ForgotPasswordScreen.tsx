import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {MD3Theme} from 'react-native-paper'

import ForgotPasswordForm from '@components/ForgotPasswordForm'
import SignFormLogo from '@components/SignFormLogo'
import {useTheme} from '@context-providers/ThemeProvider'

export default function ForgotPasswordScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <SignFormLogo />
      <ForgotPasswordForm />
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
