import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigatorScreenParams} from '@react-navigation/native'

import BottomTabNavigatorOption from '@navigation/bottom-tab/BottomTabNavigatorOption'
import AppointmentScreen from '@screens/store/AppointmentScreen'
import HomeScreen from '@screens/store/HomeScreen'
import MenuScreen from '@screens/store/MenuScreen'

const {Navigator, Screen} =
  createBottomTabNavigator<BottomTabNavigatorParamList>()

export default function BottomTabNavigator() {
  return (
    <Navigator
      key='BottomTabNavigator'
      screenOptions={BottomTabNavigatorOption}
      initialRouteName='Home'>
      <Screen name='Home' component={HomeScreen} />
      <Screen name='Appointment' component={AppointmentScreen} />
      <Screen name='Menu' component={MenuScreen} />
    </Navigator>
  )
}

export type BottomTabNavigatorParamList = {
  Home: undefined
  Appointment: undefined
  Menu: undefined
}

export type BottomTabNavigatorParams =
  NavigatorScreenParams<BottomTabNavigatorParamList>
