import React, {useState} from 'react'
import {Image, StyleSheet} from 'react-native'
import {Button, MD3Theme} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import AuthenticationService from '@services/AuthenticationService'

export default function GoogleSigninButton() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  async function onPressHandler() {
    setIsLoading(true)
    const {success} = await AuthenticationService.signinWithGoogle()
    setIsLoading(false)
    if (success) {
      navigation.navigate('TabScreen', {screen: 'HomeScreen'})
    }
  }
  return (
    <Button
      mode='contained'
      loading={isLoading}
      onPress={onPressHandler}
      style={styles.container}
      contentStyle={styles.content}
      labelStyle={styles.label}
      icon={() => <Image source={require('@assets/google_icon.png')} style={styles.icon} />}>
      Sign In with Google
    </Button>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 100,
    },
    content: {
      paddingVertical: 3,
    },
    label: {
      fontSize: theme.fonts.titleMedium.fontSize,
      color: '#373737',
    },
    icon: {
      width: 20,
      height: 20,
    },
  })
}
