import {BottomSheetModal} from '@gorhom/bottom-sheet'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {useCallback, useEffect, useRef, useState} from 'react'
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

export function useDebounce<T>(
  initialValue: T,
  callback: (val: T) => void,
  delay = 800,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [val, set] = useState<T>(initialValue)

  useEffect(() => {
    const timeout = setTimeout(() => {
      callback(val)
    }, delay)

    return () => clearTimeout(timeout)
  }, [val, delay])

  return [val, set]
}

export function useRefresh(callback: () => void) {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    callback()
    setRefreshing(false)
  }, [])

  return {refreshing, onRefresh}
}
