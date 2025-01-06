import {RouteProp} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import MenuScreen from '@screens/MenuScreen'

const {Navigator, Screen} = createNativeStackNavigator<MenuStackNavigatorParamList>()

export default function MenuStackNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName='MenuScreen'>
      <Screen name='MenuScreen' component={MenuScreen} />
    </Navigator>
  )
}

export type MenuStackNavigatorParamList = {
  MenuScreen: undefined
}

export type MenuScreenNavigationProp = RouteProp<MenuStackNavigatorParamList, 'MenuScreen'>
