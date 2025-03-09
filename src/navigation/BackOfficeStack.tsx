import {NavigatorScreenParams} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import BackofficeScreen from '@screens/BackofficeScreen'

const {Navigator, Screen, Group} = createNativeStackNavigator<BackOfficeParamList>()

export default function BackOfficeStack() {
  return (
    <Navigator
      key='BackofficeNavigator'
      screenOptions={{headerShown: false}}
      initialRouteName='Dashboard'>
      <Screen name='Dashboard' component={BackofficeScreen} />
    </Navigator>
  )
}

export type BackOfficeParamList = {
  Dashboard: undefined
}

export type BackOfficeRouteProp = NavigatorScreenParams<BackOfficeParamList>
