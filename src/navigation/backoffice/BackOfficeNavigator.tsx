import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native'
import React from 'react'

import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {CustomerCourse} from '@models/backoffice/CustomerCourseType'
import {Customer} from '@models/backoffice/CustomerType'
import BackOfficeDrawer from '@navigation/backoffice/BackOfficeDrawer'
import AdminCreateScreen from '@screens/backoffice/AdminCreateScreen'
import AdminListScreen from '@screens/backoffice/AdminListScreen'
import BlackoutPeriodCreateScreen from '@screens/backoffice/BlackoutPeriodCreateScreen'
import BlackoutPeriodDetailScreen from '@screens/backoffice/BlackoutPeriodDetailScreen'
import BlackoutPeriodListScreen from '@screens/backoffice/BlackoutPeriodListScreen'
import BookingDetailScreen from '@screens/backoffice/BookingDetailScreen'
import BookingListScreen from '@screens/backoffice/BookingListScreen'
import CategoryCreateScreen from '@screens/backoffice/CategoryCreateScreen'
import CategoryDetailScreen from '@screens/backoffice/CategoryDetailScreen'
import CategoryListScreen from '@screens/backoffice/CategoryListScreen'
import CourseCreateScreen from '@screens/backoffice/CourseCreateScreen'
import CourseDetailScreen from '@screens/backoffice/CourseDetailScreen'
import CourseListScreen from '@screens/backoffice/CourseListScreen'
import CustomerCourseDetailScreen from '@screens/backoffice/CustomerCourseDetailScreen'
import CustomerDetailScreen from '@screens/backoffice/CustomerDetailScreen'
import CustomerListScreen from '@screens/backoffice/CustomerListScreen'
import OrderDetailScreen from '@screens/backoffice/OrderDetailScreen'
import OrderListScreen from '@screens/backoffice/OrderListScreen'

const {Navigator, Screen} = createDrawerNavigator<BackOfficeScreenParamList>()

export default function BackOfficeNavigator() {
  const {theme} = useTheme()
  const {width, responsive} = useResponsiveScreen()

  return (
    <Navigator
      key='BackOfficeNavigator'
      drawerContent={props => <BackOfficeDrawer {...props} />}
      screenOptions={screenOptions(theme, width, responsive)}
      backBehavior='history'
      initialRouteName='OrderList'>
      <Screen
        name='OrderList'
        component={OrderListScreen}
        options={{title: 'Orders'}}
      />
      <Screen
        name='OrderDetail'
        component={OrderDetailScreen}
        options={{title: 'Order Details'}}
      />
      <Screen
        name='CourseList'
        component={CourseListScreen}
        options={{title: 'Courses'}}
      />
      <Screen
        name='CourseCreate'
        component={CourseCreateScreen}
        options={{title: 'Course Create'}}
      />
      <Screen
        name='CourseDetail'
        component={CourseDetailScreen}
        options={{title: 'Course Details'}}
      />
      <Screen
        name='CategoryList'
        component={CategoryListScreen}
        options={{title: 'Categories'}}
      />
      <Screen
        name='CategoryCreate'
        component={CategoryCreateScreen}
        options={{title: 'Category Create'}}
      />
      <Screen
        name='CategoryDetail'
        component={CategoryDetailScreen}
        options={{title: 'Category Details'}}
      />
      <Screen
        name='BookingList'
        component={BookingListScreen}
        options={{title: 'Booking List'}}
      />
      <Screen
        name='BookingDetail'
        component={BookingDetailScreen}
        options={{title: 'Booking Details'}}
      />
      <Screen
        name='BlackoutPeriodList'
        component={BlackoutPeriodListScreen}
        options={{title: 'Blackout Periods'}}
      />
      <Screen
        name='BlackoutPeriodCreate'
        component={BlackoutPeriodCreateScreen}
        options={{title: 'Blackout Period Create'}}
      />
      <Screen
        name='BlackoutPeriodDetail'
        component={BlackoutPeriodDetailScreen}
        options={{title: 'Blackout Period Details'}}
      />
      <Screen
        name='AdminList'
        component={AdminListScreen}
        options={{title: 'Admins'}}
      />
      <Screen
        name='AdminCreate'
        component={AdminCreateScreen}
        options={{title: 'Add admin'}}
      />
      <Screen
        name='CustomerList'
        component={CustomerListScreen}
        options={{title: 'Customers'}}
      />
      <Screen
        name='CustomerDetail'
        component={CustomerDetailScreen}
        options={{title: 'Customer Details'}}
      />
      <Screen
        name='CustomerCourseDetail'
        component={CustomerCourseDetailScreen}
        options={{title: 'Customer Course Edit'}}
      />
    </Navigator>
  )
}

function screenOptions(
  theme: AdaptiveMD3Theme,
  width: number,
  responsive: string,
): DrawerNavigationOptions {
  return {
    headerShown: true,
    headerLeft: responsive != 'MOBILE' ? () => null : undefined,
    headerStyle: {
      height: 50,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    headerTintColor: theme.colors.onSurface,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
    drawerStyle: {
      backgroundColor:
        responsive == 'MOBILE' ? 'transparent' : theme.colors.surface,
      borderColor: theme.colors.outline,
      width: responsive == 'MOBILE' ? width * 0.7 : width * 0.2,
    },
    drawerType: responsive == 'MOBILE' ? 'front' : 'permanent',
    overlayColor: 'transparent',
    swipeEdgeWidth: width * 0.8,
    swipeMinDistance: width * 0.1,
  }
}

export type BackOfficeScreenParamList = {
  Dashboard: undefined
  CourseList: undefined
  CourseCreate: undefined
  CourseDetail: {courseId: number}
  CategoryList: undefined
  CategoryCreate: undefined
  CategoryDetail: {categoryId: number}
  BookingList: undefined
  BookingDetail: {bookingId: number}
  BlackoutPeriodList: undefined
  BlackoutPeriodCreate: undefined
  BlackoutPeriodDetail: {blackoutPeridId: number}
  AdminList: undefined
  AdminCreate: undefined
  CustomerList: undefined
  CustomerDetail: {customer: Customer}
  CustomerCourseDetail: {course: CustomerCourse}
  OrderList: undefined
  OrderDetail: {orderId: number}
}

export type BackOfficeNavigatorParams =
  NavigatorScreenParams<BackOfficeScreenParamList>

export type CourseDetailRouteProp = RouteProp<
  BackOfficeScreenParamList,
  'CourseDetail'
>

export type CategoryDetailRouteProp = RouteProp<
  BackOfficeScreenParamList,
  'CategoryDetail'
>

export type BookingDetailRouteProp = RouteProp<
  BackOfficeScreenParamList,
  'BookingDetail'
>

export type BlackoutPeriodDetailRouteProp = RouteProp<
  BackOfficeScreenParamList,
  'BlackoutPeriodDetail'
>

export type CustomerDetailRouteProp = RouteProp<
  BackOfficeScreenParamList,
  'CustomerDetail'
>

export type CustomerCourseDetailRouteProp = RouteProp<
  BackOfficeScreenParamList,
  'CustomerCourseDetail'
>

export type OrderDetailRouteProp = RouteProp<
  BackOfficeScreenParamList,
  'OrderDetail'
>
