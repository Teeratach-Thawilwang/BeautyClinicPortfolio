import React, {useEffect} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import ReduxProvider from '@context-providers/ReduxProvider'
import ThemeProvider from '@context-providers/ThemeProvider'
import AppNavigator from '@navigation/AppNavigator'
import {configureGoogleSignIn} from '@repositories/GoogleSignin'
import {configureSplashScreen} from '@utils/SplashScreenConfig'

if (process.env.STAGING != 'production') {
  require('./ReactotronConfig')
}

export default function App() {
  useEffect(() => {
    configureSplashScreen()
    configureGoogleSignIn()
  }, [])

  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  )
}
