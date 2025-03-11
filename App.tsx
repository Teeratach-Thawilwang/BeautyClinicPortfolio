import 'react-native-gesture-handler'

import React, {useEffect} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import ReduxProvider from '@context-providers/ReduxProvider'
import ThemeProvider from '@context-providers/ThemeProvider'
import AppNavigator from '@navigation/AppNavigator'
import {configureGoogleSignIn} from '@repositories/GoogleSignIn'
import {requestNotificationPermission} from '@utils/FirebaseMessage'
import {configureSplashScreen} from '@utils/SplashScreenConfig'
import {supabaseListeners} from '@utils/SupabaseListener'

;(globalThis as any).RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true

if (process.env.STAGING !== 'production' && process.env.STAGING !== 'test') {
  require('./ReactotronConfig')
}

export default function App() {
  useEffect(() => {
    configureSplashScreen()
    configureGoogleSignIn()
    requestNotificationPermission()
    const supabaseListener = supabaseListeners()

    return () => {
      supabaseListener.data.subscription.unsubscribe()
    }
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
