import {NavigationContainer, RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp, createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import LinkingConfiguration from '@navigation/LinkingConfiguration'
import TabScreens, {TabNavigatorRouteProp} from '@navigation/TabScreens'
import ConfirmSignupScreen from '@screens/ConfirmSignupScreen'
import ForgotPasswordScreen from '@screens/ForgotPasswordScreen'
import ResetPasswordScreen from '@screens/ResetPasswordScreen'
import SignInScreen from '@screens/SignInScreen'
import SignUpScreen from '@screens/SignUpScreen'

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Navigator screenOptions={{headerShown: false}} initialRouteName='TabScreen'>
        <Screen name='TabScreen' component={TabScreens} />
        <Screen name='SignUpScreen' component={SignUpScreen} />
        <Screen name='SignInScreen' component={SignInScreen} />
        <Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
        <Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
        <Screen name='ConfirmSignupScreen' component={ConfirmSignupScreen} />
      </Navigator>
    </NavigationContainer>
  )
}

export type RootStackParamList = {
  TabScreen: TabNavigatorRouteProp
  SignUpScreen: undefined
  SignInScreen: undefined
  ForgotPasswordScreen: undefined
  ResetPasswordScreen: {token_hash: string}
  ConfirmSignupScreen: {token_hash: string}
}

export type RootScreenNavigationProps = NativeStackNavigationProp<RootStackParamList>
export type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUpScreen'>
export type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignInScreen'>
export type ForgotPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ForgotPasswordScreen'>
export type ResetPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ResetPasswordScreen'>
export type ConfirmSignupScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmSignupScreen'>
