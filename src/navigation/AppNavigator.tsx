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
import CategoryCourseScreen from '@screens/store/CategoryCourseScreen'
import CheckoutScreen from '@screens/store/CheckoutScreen'
import ConfirmSignupScreen from '@screens/store/ConfirmSignupScreen'
import CourseDetailScreen from '@screens/store/CourseDetailScreen'
import ForgotPasswordScreen from '@screens/store/ForgotPasswordScreen'
import OrderHistoryScreen from '@screens/store/OrderHistoryScreen'
import PaymentScreen from '@screens/store/PaymentScreen'
import ResetPasswordScreen from '@screens/store/ResetPasswordScreen'
import SearchResultScreen from '@screens/store/SearchResultScreen'
import SignInScreen from '@screens/store/SignInScreen'
import SignUpScreen from '@screens/store/SignUpScreen'
import AuthService from '@services/AuthService'
import {PaymentMethod} from '@utils/Payments'

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
        <Group>
          <Screen name='SearchResultScreen' component={SearchResultScreen} />
          <Screen
            name='CategoryCourseScreen'
            component={CategoryCourseScreen}
          />
          <Screen name='CourseDetailScreen' component={CourseDetailScreen} />
          <Screen name='CheckoutScreen' component={CheckoutScreen} />
          <Screen name='PaymentScreen' component={PaymentScreen} />
          <Screen name='OrderHistoryScreen' component={OrderHistoryScreen} />
        </Group>

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
  CourseDetailScreen: {
    course: WidgetCourseItemDetail
    category?: {id: number; name: string}
  }
  CategoryCourseScreen: {categoryId: number; categoryName: string}
  CheckoutScreen: {
    course: WidgetCourseItemDetail
    category?: {id: number; name: string}
  }
  PaymentScreen: {
    paymentMethod: PaymentMethod
    amount: number
    orderId: number
    chargeId?: string
    qrCode?: string
    authorizeUri?: string
    referenceNo?: string
  }
  OrderHistoryScreen: undefined
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
export type CategoryCourseScreenRouteProp = RouteProp<
  RootStackParamList,
  'CategoryCourseScreen'
>
export type CourseDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CourseDetailScreen'
>
export type CheckoutScreenRouteProp = RouteProp<
  RootStackParamList,
  'CheckoutScreen'
>
export type PaymentScreenRouteProp = RouteProp<
  RootStackParamList,
  'PaymentScreen'
>
