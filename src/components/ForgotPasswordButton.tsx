import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, MD3Theme} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

export default function ForgotPasswordButton() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  return (
    <View style={styles.container}>
      <Button labelStyle={styles.label} mode='text' onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        Forgot password ?
      </Button>
    </View>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      padding: 0,
      marginHorizontal: 0,
      color: theme.colors.primary,
      fontSize: theme.fonts.titleMedium.fontSize,
    },
  })
}
