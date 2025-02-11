import {NavigationContainer, RouteProp} from '@react-navigation/native'
import {StackNavigationProp, createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import LinkingConfiguration from '@navigation/LinkingConfiguration'
import TabScreens, {TabNavigatorRouteProp} from '@navigation/TabScreens'
import ConfirmSignupScreen from '@screens/ConfirmSignupScreen'
import ForgotPasswordScreen from '@screens/ForgotPasswordScreen'
import ResetPasswordScreen from '@screens/ResetPasswordScreen'
import SigninScreen from '@screens/SigninScreen'
import SignupScreen from '@screens/SignupScreen'

const {Navigator, Screen} = createStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Navigator screenOptions={{headerShown: false}} initialRouteName='TabScreen'>
        <Screen name='TabScreen' component={TabScreens} />
        <Screen name='SignupScreen' component={SignupScreen} />
        <Screen name='SigninScreen' component={SigninScreen} />
        <Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
        <Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
        <Screen name='ConfirmSignupScreen' component={ConfirmSignupScreen} />
      </Navigator>
    </NavigationContainer>
  )
}

export type RootStackParamList = {
  TabScreen: TabNavigatorRouteProp
  SignupScreen: undefined
  SigninScreen: undefined
  ForgotPasswordScreen: undefined
  ResetPasswordScreen: {token_hash: string}
  ConfirmSignupScreen: {token_hash: string}
}

export type RootScreenNavigationProps = StackNavigationProp<RootStackParamList>
export type SignupScreenRouteProp = RouteProp<RootStackParamList, 'SignupScreen'>
export type SigninScreenRouteProp = RouteProp<RootStackParamList, 'SigninScreen'>
export type ForgotPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ForgotPasswordScreen'>
export type ResetPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ResetPasswordScreen'>
export type ConfirmSignupScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmSignupScreen'>
