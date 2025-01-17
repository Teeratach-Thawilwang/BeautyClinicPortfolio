import React, {useEffect} from 'react'
import {Platform} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

import ThemeProvider from '@context-providers/ThemeProvider'
import AppNavigator from '@navigation/AppNavigator'

if (process.env.STAGING != 'production') {
  require('./ReactotronConfig')
}

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide()
    }
  }, [])

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
