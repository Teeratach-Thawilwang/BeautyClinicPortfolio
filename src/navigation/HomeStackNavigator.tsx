import {RouteProp} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import HomeScreen from '@screens/HomeScreen'

const {Navigator, Screen} = createNativeStackNavigator<HomeStackNavigatorParamList>()

export default function HomeStackNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName='HomeScreen'>
      <Screen name='HomeScreen' component={HomeScreen} />
    </Navigator>
  )
}

export type HomeStackNavigatorParamList = {
  HomeScreen: undefined
}

export type HomeScreenNavigationProp = RouteProp<HomeStackNavigatorParamList, 'HomeScreen'>
