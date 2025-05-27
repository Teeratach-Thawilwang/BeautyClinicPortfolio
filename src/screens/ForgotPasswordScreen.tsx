import React from 'react'
import {ScrollView} from 'react-native'

import ForgotPasswordForm from '@components/Authentication/ForgotPasswordForm'
import LogoHeader from '@components/LogoHeader'
import ScreenStyle from '@styles/ScreenStyle'

export default function ForgotPasswordScreen() {
  return (
    <ScrollView style={ScreenStyle().container} keyboardShouldPersistTaps='handled'>
      <LogoHeader />
      <ForgotPasswordForm />
    </ScrollView>
  )
}
