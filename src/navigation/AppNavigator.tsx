import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import React from 'react'

import AppointmentStackNavigator, {AppointmentStackNavigatorParamList} from '@navigation/AppointmentStackNavigator'
import HomeStackNavigator, {HomeStackNavigatorParamList} from '@navigation/HomeStackNavigator'
import MenuStackNavigator, {MenuStackNavigatorParamList} from '@navigation/MenuStackNavigator'
import TabNavigatorOption from '@navigation/TabNavigatorOption'

const {Navigator, Screen} = createBottomTabNavigator<BottomTabNavigatorParamList>()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={TabNavigatorOption} initialRouteName='Home'>
        <Screen name='Home' component={HomeStackNavigator} />
        <Screen name='Appointment' component={AppointmentStackNavigator} />
        <Screen name='Menu' component={MenuStackNavigator} />
      </Navigator>
    </NavigationContainer>
  )
}

export const TabRoutes = [
  {name: 'Home', focusedIcon: 'ant-home', unfocusedIcon: 'ant-home'},
  {name: 'Appointment', focusedIcon: 'ant-calendar', unfocusedIcon: 'ant-calendar'},
  {name: 'Menu', focusedIcon: 'text-account', unfocusedIcon: 'text-account'},
]

export type BottomTabNavigatorParamList = {
  Home: NavigatorScreenParams<HomeStackNavigatorParamList>
  Appointment: NavigatorScreenParams<AppointmentStackNavigatorParamList>
  Menu: NavigatorScreenParams<MenuStackNavigatorParamList>
}

export type ScreenNavigationProp = NativeStackNavigationProp<BottomTabNavigatorParamList>
