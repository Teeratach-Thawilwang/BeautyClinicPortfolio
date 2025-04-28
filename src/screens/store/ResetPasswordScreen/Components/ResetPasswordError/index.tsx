import React from 'react'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import InlineTextLink from '@components/InlineTextLink'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

import {getStyles} from './styles'

export default function ResetPasswordError({error}: {error: string}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.errorText}>{error}</Text>
      <View style={styles.space} />
      <InlineTextLink
        text='Try again ? '
        linkText='Forgot Password'
        onPress={() => navigation.replace('ForgotPasswordScreen')}
      />
      <Button
        containerStyle={styles.buttonContainer}
        labelStyle={styles.buttonLabel}
        onPress={() =>
          navigation.replace('BottomTabScreens', {screen: 'Home'})
        }>
        Home
      </Button>
    </View>
  )
}
