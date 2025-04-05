import {BottomSheetModal} from '@gorhom/bottom-sheet'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {useCallback, useRef} from 'react'
import {BackHandler, useWindowDimensions} from 'react-native'

import {RootScreenNavigationProps} from '@navigation/AppNavigator'
import AuthenticationService from '@services/AuthenticationService'
import {getResponsiveScreen} from '@utils/Helpers'

export function useNavigate() {
  return useNavigation<RootScreenNavigationProps>()
}

export function useEffectScreen(handler: () => void, dependencies: []) {
  useFocusEffect(useCallback(handler, dependencies))
}

export function disableBackSwipe(handler: () => boolean) {
  useEffectScreen(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handler,
    )
    return () => backHandler.remove()
  }, [])
}

export async function googleSignInHandler(
  navigation: RootScreenNavigationProps,
) {
  const {success} = await AuthenticationService.signinWithGoogle()
  if (success) {
    navigation.navigate('BottomTabScreens', {screen: 'Home'})
  }
}

export function useResponsiveScreen() {
  const {width} = useWindowDimensions()
  return {width: width, responsive: getResponsiveScreen(width)}
}

export function createBottomSheetRef() {
  return useRef<BottomSheetModal>(null)
}
