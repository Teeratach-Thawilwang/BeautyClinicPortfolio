import React, {useRef, useState} from 'react'
import {ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import LogoHeader from '@components/LogoHeader'
import {useTheme} from '@context-providers/ThemeProvider'
import {disableBackSwipe, useFocusEffect, useNavigate} from '@hooks/CommonHooks'
import {useVerifyRecoveryTokenMutation} from '@hooks/store/ResetPasswordHooks'
import {ResetPasswordScreenRouteProp} from '@navigation/AppNavigator'
import AuthService from '@services/AuthService'

import ResetPasswordError from './Components/ResetPasswordError'
import ResetPasswordForm from './Components/ResetPasswordForm'
import {getStyles} from './styles'

export default function ResetPasswordScreen({
  route,
}: {
  route: ResetPasswordScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const isPasswordUpdated = useRef(false)
  const isSignIn = AuthService.getIsSignIn()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const {mutate, data, error} = useVerifyRecoveryTokenMutation()

  disableBackSwipe(() => true)

  useFocusEffect(() => {
    setIsFirstRender(true)
    isPasswordUpdated.current = false

    if (isSignIn) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTabScreens',
            state: {
              routes: [{name: 'Home'}],
              index: 0,
            },
          },
        ],
      })
      return
    }
    if (route.params.token_hash) {
      mutate(route.params.token_hash)
    }
    setIsFirstRender(false)
    return () => {
      if (!isPasswordUpdated.current) AuthService.signOut()
    }
  }, [route.params.token_hash])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'>
      <LogoHeader allowBack={false} />
      {isFirstRender ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator
            animating={true}
            color={theme.colors.primary}
            size='small'
          />
        </View>
      ) : null}
      {!isFirstRender && data ? (
        <ResetPasswordForm
          email={data.email!}
          onSuccess={() => {
            isPasswordUpdated.current = true
          }}
        />
      ) : null}
      {!isFirstRender && error?.message ? (
        <ResetPasswordError error={error.message} />
      ) : null}
    </ScrollView>
  )
}
