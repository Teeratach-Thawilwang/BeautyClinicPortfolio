import {NavigationContainer, RouteProp} from '@react-navigation/native'
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import React from 'react'

import {WidgetCourseItemDetail} from '@models/store/WidgetTypes'
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

const {Navigator, Screen, Group} =
  createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
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
  SearchResultScreen: {q: string}
  CourseDetailScreen: {course: WidgetCourseItemDetail}
  CategoryCourseScreen: {categoryId: number; categoryName: string}
}

export type RootScreenNavigationProps =
  NativeStackNavigationProp<RootStackParamList>
export type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ResetPasswordScreen'
>
export type ConfirmSignupScreenRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmSignupScreen'
>
export type SearchResultScreenRouteProp = RouteProp<
  RootStackParamList,
  'SearchResultScreen'
>
export type CourseDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CourseDetailScreen'
>
export type CategoryCourseScreenRouteProp = RouteProp<
  RootStackParamList,
  'CategoryCourseScreen'
>
