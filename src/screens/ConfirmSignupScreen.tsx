import React, {useState} from 'react'
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native'
import {ActivityIndicator, MD3Theme} from 'react-native-paper'

import ResponseModal from '@components/ResponseModal'
import SignFormLogo from '@components/SignFormLogo'
import {useTheme} from '@context-providers/ThemeProvider'
import {disableBackSwipe, useEffectScreen, useNavigate} from '@hooks/CommonHooks'
import {ConfirmSignupScreenRouteProp} from '@navigation/AppNavigator'
import AuthenticationService from '@services/AuthenticationService'

export default function ConfirmSignupScreen({route}: {route: ConfirmSignupScreenRouteProp}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const user = AuthenticationService.getUser()
  const error = AuthenticationService.getError()
  const [isModalShow, setIsModalShow] = useState(false)

  disableBackSwipe(() => true)

  useEffectScreen(() => {
    setIsModalShow(false)
    if (user) {
      navigation.replace('TabScreen', {screen: 'HomeScreen'})
    } else if (route.params.token_hash) {
      AuthenticationService.verifyConfirmSingupToken(route.params.token_hash).finally(() => {
        setIsModalShow(true)
      })
    }
  }, [])

  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
      <SignFormLogo isBackAble={false} />
      <View style={styles.containerLoading}>
        <ActivityIndicator animating={true} color={theme.colors.primary} size='small' />
      </View>
      {error ? (
        <ResponseModal
          isVisible={isModalShow}
          isSuccess={false}
          title='Confirm Signup Failed.'
          text={error}
          buttonText='Continue'
          onButtonPress={() => navigation.replace('TabScreen', {screen: 'HomeScreen'})}
        />
      ) : (
        <ResponseModal
          isVisible={isModalShow}
          isSuccess={true}
          title='Confirm Signup Successfully.'
          text="Signup successful! You're ready to get started."
          buttonText='Continue'
          onButtonPress={() => navigation.replace('TabScreen', {screen: 'HomeScreen'})}
        />
      )}
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
