import React, {useRef, useState} from 'react'
import {ScrollView} from 'react-native'

import ResetPasswordRender from '@components/Authentication/ResetPasswordRender'
import LogoHeader from '@components/LogoHeader'
import {disableBackSwipe, useEffectScreen, useNavigate} from '@hooks/CommonHooks'
import {ResetPasswordScreenRouteProp} from '@navigation/AppNavigator'
import AuthenticationService from '@services/AuthenticationService'
import ScreenStyle from '@styles/ScreenStyle'

export default function ResetPasswordScreen({
  route,
}: {
  route: ResetPasswordScreenRouteProp
}) {
  const navigation = useNavigate()
  const isPasswordUpdated = useRef(false)
  const user = AuthenticationService.getUser()
  const error = AuthenticationService.getError()
  const [isFirstRender, setIsFirstRender] = useState(true)

  disableBackSwipe(() => true)

  useEffectScreen(() => {
    setIsFirstRender(true)
    isPasswordUpdated.current = false

    if (user) {
      navigation.replace('TabScreen', {screen: 'Home'})
      return
    }
    if (route.params.token_hash) {
      AuthenticationService.verifyRecoveryToken(route.params.token_hash)
    }
    setIsFirstRender(false)
    return () => {
      if (!isPasswordUpdated.current) AuthenticationService.signOut()
    }
  }, [])

  return (
    <ScrollView
      style={ScreenStyle().container}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'>
      <LogoHeader allowBack={false} />
      <ResetPasswordRender
        isFirstRender={isFirstRender}
        user={user}
        error={error}
        onSuccess={() => {
          isPasswordUpdated.current = true
        }}
      />
    </ScrollView>
  )
}
