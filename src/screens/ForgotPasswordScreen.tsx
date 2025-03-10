import React from 'react'
import {ScrollView} from 'react-native'

import ForgotPasswordForm from '@components/Authentication/ForgotPasswordForm'
import LogoHeader from '@components/LogoHeader'
import getStyles from '@styles/Screen.style'

export default function ForgotPasswordScreen() {
  return (
    <ScrollView
      style={getStyles().container}
      keyboardShouldPersistTaps='handled'>
      <LogoHeader />
      <ForgotPasswordForm />
    </ScrollView>
  )
}
