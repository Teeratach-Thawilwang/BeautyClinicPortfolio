import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native'

import BottomTabNavigatorOption from '@navigation/bottom-tab/BottomTabNavigatorOption'
import AppointmentScreen from '@screens/store/AppointmentScreen'
import HomeScreen from '@screens/store/HomeScreen'
import MenuScreen from '@screens/store/MenuScreen'

const {Navigator, Screen} =
  createBottomTabNavigator<BottomTabNavigatorParamList>()

export default function BottomTabNavigator() {
  const appoinmentBadge = undefined
  return (
    <Navigator
      key='BottomTabNavigator'
      screenOptions={BottomTabNavigatorOption}
      initialRouteName='Home'>
      <Screen name='Home' component={HomeScreen} />
      <Screen
        name='Appointment'
        component={AppointmentScreen}
        options={{tabBarBadge: appoinmentBadge}}
      />
      <Screen name='Menu' component={MenuScreen} />
    </Navigator>
  )
}

export type BottomTabNavigatorParamList = {
  Home: undefined
  Appointment: {tab?: 'Course' | 'Booking'}
  Menu: undefined
}

export type BottomTabNavigatorParams =
  NavigatorScreenParams<BottomTabNavigatorParamList>

export type AppointmentScreenRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  'Appointment'
>
