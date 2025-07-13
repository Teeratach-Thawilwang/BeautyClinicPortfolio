import React from 'react'
import {ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import LogoHeader from '@components/LogoHeader'
import ResponseModal from '@components/ResponseModal'
import {useTheme} from '@context-providers/ThemeProvider'
import {disableBackSwipe, useFocusEffect, useNavigate} from '@hooks/CommonHooks'
import {useVerifyConfirmSingupTokenMutation} from '@hooks/store/ResetPasswordHooks'
import {ConfirmSignupScreenRouteProp} from '@navigation/AppNavigator'
import AuthService from '@services/AuthService'

import {getStyles} from './styles'

export default function ConfirmSignupScreen({
  route,
}: {
  route: ConfirmSignupScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const isSignIn = AuthService.getIsSignIn()
  const {mutate, error, isModalVisible, setIsModalVisible} =
    useVerifyConfirmSingupTokenMutation()

  disableBackSwipe(() => true)

  useFocusEffect(() => {
    setIsModalVisible(false)
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
    } else if (route.params.token_hash) {
      mutate(route.params.token_hash)
    }
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'>
      <LogoHeader allowBack={false} />
      <View style={styles.containerLoading}>
        <ActivityIndicator
          animating={true}
          color={theme.colors.primary}
          size='small'
        />
      </View>
      {error?.message ? (
        <ResponseModal
          visible={isModalVisible}
          title='Confirm Signup Failed.'
          text={error.message}
          imageSource={require('@assets/images/failed_icon.png')}
          buttonText='Continue'
          onButtonPress={() =>
            navigation.replace('BottomTabScreens', {screen: 'Home'})
          }
        />
      ) : (
        <ResponseModal
          visible={isModalVisible}
          title='Confirm Signup Successfully.'
          text="Signup successful! You're ready to get started."
          imageSource={require('@assets/images/successfully_icon.png')}
          buttonText='Continue'
          onButtonPress={() =>
            navigation.replace('BottomTabScreens', {screen: 'Home'})
          }
        />
      )}
    </ScrollView>
  )
}
