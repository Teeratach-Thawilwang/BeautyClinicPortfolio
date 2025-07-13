import React from 'react'
import {Image, View} from 'react-native'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

import {getStyles} from './styles'

export default function GuestSignin() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@assets/images/logo.png')}
          style={styles.logoImage}
        />
      </View>
      <Button
        mode='outlined'
        onPress={() => navigation.navigate('SignInScreen')}
        containerStyle={styles.buttonContainer}
        labelStyle={styles.buttonLabel}>
        Sign in / Sign up
      </Button>
    </View>
  )
}
