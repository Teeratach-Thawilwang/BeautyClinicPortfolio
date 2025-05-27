import SplashScreen from 'react-native-splash-screen'

import {getPlatFormOS} from '@utils/Helpers'

export function configureSplashScreen() {
  if (getPlatFormOS() === 'android') {
    SplashScreen.hide()
  }
}
