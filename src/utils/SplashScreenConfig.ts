import {Platform} from 'react-native'
import SplashScreen from 'react-native-splash-screen'

export function configureSplashScreen() {
  if (Platform.OS === 'android') {
    SplashScreen.hide()
  }
}
