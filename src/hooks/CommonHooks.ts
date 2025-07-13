import {BottomSheetModal} from '@gorhom/bottom-sheet'
import {
  useFocusEffect as useFocusEffectRN,
  useNavigation,
} from '@react-navigation/native'
import {useCallback, useEffect, useRef, useState} from 'react'
import {
  AppState,
  AppStateStatus,
  BackHandler,
  useWindowDimensions,
} from 'react-native'

import {RootScreenNavigationProps} from '@navigation/AppNavigator'
import AuthService from '@services/AuthService'
import {getResponsiveScreen} from '@utils/Helpers'

export function useNavigate() {
  return useNavigation<RootScreenNavigationProps>()
}

export function useFocusEffect(handler: () => void, dependencies: any[]) {
  useFocusEffectRN(useCallback(handler, dependencies))
}

export function useAppState() {
  const [state, setState] = useState(AppState.currentState)
  useFocusEffect(() => {
    const subscription = AppState.addEventListener('change', appState =>
      setState(appState),
    )
    return () => {
      subscription.remove()
    }
  }, [])
  return state
}

export function disableBackSwipe(handler: () => boolean) {
  useFocusEffect(() => {
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
  const {success} = await AuthService.signInWithGoogle()
  if (success) {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'BottomTabScreens',
          state: {
            routes: [{name: 'Home'}],
            index: 0,
          },
        },
      ],
    })
  }
}

export function useResponsiveScreen(): {
  width: number
  responsive: 'MOBILE' | 'TABLET' | 'DESKTOP'
} {
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
    const timeout = setTimeout(() => {
      setRefreshing(false)
    }, 10)
    return () => clearTimeout(timeout)
  }, [])

  return {refreshing, onRefresh}
}
