import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {useCallback} from 'react'
import {BackHandler} from 'react-native'

import {RootScreenNavigationProps} from '@navigation/AppNavigator'

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
