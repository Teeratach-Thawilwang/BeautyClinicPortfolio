import React, {useRef, useState} from 'react'
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native'
import {ActivityIndicator, MD3Theme} from 'react-native-paper'

import ResetPasswordError from '@components/ResetPasswordError'
import ResetPasswordForm from '@components/ResetPasswordForm'
import SignFormLogo from '@components/SignFormLogo'
import {useTheme} from '@context-providers/ThemeProvider'
import {disableBackSwipe, useEffectScreen, useNavigate} from '@hooks/CommonHooks'
import {ResetPasswordScreenRouteProp} from '@navigation/AppNavigator'
import AuthenticationService from '@services/AuthenticationService'

export default function ResetPasswordScreen({route}: {route: ResetPasswordScreenRouteProp}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const user = AuthenticationService.getUser()
  const error = AuthenticationService.getError()
  const [isfirstRender, setIsFirstRender] = useState(true)
  const isPasswordUpdated = useRef(false)

  disableBackSwipe(() => true)

  useEffectScreen(() => {
    setIsFirstRender(true)
    if (user) {
      navigation.replace('TabScreen', {screen: 'HomeScreen'})
    } else if (route.params.token_hash) {
      AuthenticationService.verifyRecoveryToken(route.params.token_hash).finally(() => {
        setIsFirstRender(false)
      })
    }
    return () => {
      if (!isPasswordUpdated.current) AuthenticationService.signOut()
    }
  }, [])

  function RenderComponentByCase() {
    if (isfirstRender) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator animating={true} color={theme.colors.primary} size='small' />
        </View>
      )
    }
    if (!isfirstRender && user) {
      return (
        <ResetPasswordForm
          email={user.email!}
          setUpdated={() => {
            isPasswordUpdated.current = true
          }}
        />
      )
    }
    if (!isfirstRender && error) {
      return <ResetPasswordError error={error} />
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
      <SignFormLogo isBackAble={false} />
      {RenderComponentByCase()}
    </ScrollView>
  )
}

function getStyles(theme: MD3Theme) {
  const {width, height} = Dimensions.get('window')
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    containerLoading: {
      width: width - 40,
      height: height,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  })
}
