import {NavigationContainer, RouteProp} from '@react-navigation/native'
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack'
import React from 'react'

import LinkingConfiguration from '@navigation/LinkingConfiguration'
import BackOfficeNavigator, {
  BackOfficeNavigatorParams,
} from '@navigation/backoffice/BackOfficeNavigator'
import BottomTabNavigator, {
  BottomTabNavigatorParams,
} from '@navigation/bottom-tab/BottomTabNavigator'
import ConfirmSignupScreen from '@screens/store/ConfirmSignupScreen'
import ForgotPasswordScreen from '@screens/store/ForgotPasswordScreen'
import ResetPasswordScreen from '@screens/store/ResetPasswordScreen'
import SignInScreen from '@screens/store/SignInScreen'
import SignUpScreen from '@screens/store/SignUpScreen'
import AuthService from '@services/AuthService'

const {Navigator, Screen, Group} = createStackNavigator<RootStackParamList>()

export default function AppNavigatorMock() {
  const isSignIn = AuthService.getIsSignIn()
  const isAdmin = AuthService.getIsAdmin()

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='BottomTabScreens'>
        <Screen name='BottomTabScreens' component={BottomTabNavigator} />
        {!isSignIn ? (
          <Group>
            <Screen name='SignUpScreen' component={SignUpScreen} />
            <Screen name='SignInScreen' component={SignInScreen} />
            <Screen
              name='ForgotPasswordScreen'
              component={ForgotPasswordScreen}
            />
            <Screen
              name='ConfirmSignupScreen'
              component={ConfirmSignupScreen}
            />
            <Screen
              name='ResetPasswordScreen'
              component={ResetPasswordScreen}
            />
          </Group>
        ) : null}
        {isAdmin ? (
          <Screen name='BackOfficeScreens' component={BackOfficeNavigator} />
        ) : null}
      </Navigator>
    </NavigationContainer>
  )
}

export type RootStackParamList = {
  BottomTabScreens: BottomTabNavigatorParams
  BackOfficeScreens: BackOfficeNavigatorParams
  SignUpScreen: undefined
  SignInScreen: undefined
  ForgotPasswordScreen: undefined
  ResetPasswordScreen: {token_hash: string}
  ConfirmSignupScreen: {token_hash: string}
}

export type RootScreenNavigationProps = StackNavigationProp<RootStackParamList>
export type SignUpScreenRouteProp = RouteProp<
  RootStackParamList,
  'SignUpScreen'
>
export type SignInScreenRouteProp = RouteProp<
  RootStackParamList,
  'SignInScreen'
>
export type ForgotPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ForgotPasswordScreen'
>
export type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ResetPasswordScreen'
>
export type ConfirmSignupScreenRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmSignupScreen'
>
