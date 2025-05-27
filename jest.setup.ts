import React from 'react'

// ----------------------------------------------------------------------------
// ------------------------- Mock Third-party Library -------------------------

jest.mock('react-native-modal', () => require('@components/__mock__/ReactNativeModal'))

jest.mock('reactotron-react-native', () => ({
  setAsyncStorageHandler: jest.fn().mockReturnThis(),
  configure: jest.fn().mockReturnThis(),
  useReactNative: jest.fn().mockReturnThis(),
  use: jest.fn().mockReturnThis(),
  connect: jest.fn(),
}))

jest.mock('reactotron-redux', () => ({
  reactotronRedux: jest.fn(),
}))

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: () => jest.fn(),
  getItem: () => jest.fn(),
}))

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({children}: {children: React.ReactNode}) => children,
}))

jest.mock('redux-persist', () => ({
  persistReducer: jest.fn((_, reducers) => reducers),
  persistStore: jest.fn(() => ({
    persist: jest.fn(),
    purge: jest.fn(),
  })),
}))

// Use @react-navigation/stack when running tests.
// Use @react-navigation/native-stack to maintain performance when not running tests.
jest.mock('@navigation/AppNavigator', () => require('@navigation/__mock__/AppNavigator'))

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
}))

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View')
  return {
    ...jest.requireActual('react-native-gesture-handler/jestSetup'),
    GestureHandlerRootView: View,
    PinchGestureHandler: View,
  }
})

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: jest.fn(),
}))

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

jest.mock('react-native/src/private/animated/NativeAnimatedHelper')

// ----------------------------------------------------------------------------
// ----------------------- Custom Mock Implementation -------------------------

jest.mock('react-native-modal', () => require('@components/__mock__/ReactNativeModal'))

jest.mock(
  '@context-providers/ReduxProvider',
  () =>
    ({children}: {children: JSX.Element}) => {
      children
    },
)

jest.mock('@store/Store', () => ({
  useAppSelector: jest.fn(),
}))

jest.mock('@repositories/supabase/SupabaseClient', () => ({
  createClient: jest.fn(),
}))

jest.mock('@repositories/GoogleSignIn', () => ({
  configureGoogleSignIn: jest.fn(),
  signInOnGoogle: jest.fn(),
}))

jest.mock('@utils/SplashScreenConfig', () => ({
  configureSplashScreen: jest.fn(),
}))

jest.mock('@hooks/CommonHooks', () => {
  return {
    ...jest.requireActual('@hooks/CommonHooks'),
    useNavigate: jest.fn(() => ({
      navigate: jest.fn(),
      replace: jest.fn(),
    })),
  }
})

// ----------------------------------------------------------------------------
// -------------------------------- Setup Test --------------------------------

beforeEach(() => {
  // if want to use real timers, use jest.useRealTimers() inside each test.
  jest.useFakeTimers()
  jest.restoreAllMocks()
  jest.resetAllMocks()
})
