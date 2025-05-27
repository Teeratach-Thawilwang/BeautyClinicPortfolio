import 'react-native-gesture-handler'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import React, {useEffect} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import QueryClientProvider from '@context-providers/QueryClientProvider'
import ReduxProvider from '@context-providers/ReduxProvider'
import ThemeProvider from '@context-providers/ThemeProvider'
import AppNavigator from '@navigation/AppNavigator'
import {requestNotificationPermission} from '@utils/FirebaseMessage'
import {configureGoogleSignIn} from '@utils/GoogleSignIn'
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
    const supabaseUnSubscribe = supabaseListeners()

    return () => {
      supabaseUnSubscribe()
    }
  }, [])

  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <QueryClientProvider>
          <ThemeProvider>
            <GestureHandlerRootView>
              <BottomSheetModalProvider>
                <AppNavigator />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </ThemeProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  )
}
