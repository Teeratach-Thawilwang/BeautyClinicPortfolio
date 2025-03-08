import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigatorScreenParams} from '@react-navigation/native'

import TabNavigatorOption from '@navigation/TabNavigatorOption'
import AppointmentScreen from '@screens/AppointmentScreen'
import HomeScreen from '@screens/HomeScreen'
import MenuScreen from '@screens/MenuScreen'

const {Navigator, Screen} = createBottomTabNavigator<TabScreenParamList>()

export default function TabScreens() {
  return (
    <Navigator
      key='TabScreens'
      screenOptions={TabNavigatorOption}
      initialRouteName='HomeScreen'>
      <Screen name='HomeScreen' component={HomeScreen} />
      <Screen name='AppointmentScreen' component={AppointmentScreen} />
      <Screen name='MenuScreen' component={MenuScreen} />
    </Navigator>
  )
}

export type TabScreenParamList = {
  HomeScreen: undefined
  AppointmentScreen: undefined
  MenuScreen: undefined
}

export type TabNavigatorRouteProp = NavigatorScreenParams<TabScreenParamList>
