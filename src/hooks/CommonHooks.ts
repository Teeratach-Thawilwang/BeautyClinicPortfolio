import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {useCallback} from 'react'
import {BackHandler} from 'react-native'

import {RootScreenNavigationProps} from '@navigation/AppNavigator'
import AuthenticationService from '@services/AuthenticationService'

export function useNavigate() {
  return useNavigation<RootScreenNavigationProps>()
}

export function useEffectScreen(handler: () => void, dependencies: []) {
  useFocusEffect(useCallback(handler, dependencies))
}

export function disableBackSwipe(handler: () => boolean) {
  useEffectScreen(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handler)
    return () => backHandler.remove()
  }, [])
}

export async function googleSignInHandler(navigation: RootScreenNavigationProps) {
  const {success} = await AuthenticationService.signinWithGoogle()
  if (success) {
    navigation.navigate('TabScreen', {screen: 'Home'})
  }
}
