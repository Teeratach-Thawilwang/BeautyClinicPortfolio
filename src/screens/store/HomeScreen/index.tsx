import React, {useState} from 'react'
import {ScrollView, StyleSheet, Text} from 'react-native'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme, ThemeEnum} from '@models/ThemeTypes'
import AuthService from '@services/AuthService'

export default function HomeScreen() {
  const {theme, schema, toggleTheme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const user = AuthService.getUser()

  const [val, setVal] = useState('')

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <Text style={styles.text}>HomeScreen</Text>
      <Text style={styles.text}>user: {user?.email}</Text>
      <Button onPress={toggleTheme}>Change Theme</Button>
      <Button
        useLoading
        icon='home'
        mode='outlined'
        onPress={async () => {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }}>
        Press me
      </Button>
    </ScrollView>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    text: {
      color: theme.colors.onSurface,
      textAlign: 'center',
      fontSize: theme.fontSize.body,
    },
  })
}
