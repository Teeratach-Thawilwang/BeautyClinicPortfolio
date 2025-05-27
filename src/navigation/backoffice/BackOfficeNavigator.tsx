import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native'
import React from 'react'

import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'
import BackOfficeDrawer from '@navigation/backoffice/BackOfficeDrawer'
import CourseCreateScreen from '@screens/backoffice/CourseCreateScreen'
import CourseDetailScreen from '@screens/backoffice/CourseDetailScreen'
import CourseListScreen from '@screens/backoffice/CourseListScreen'
import DashboardScreen from '@screens/backoffice/DashboardScreen'

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
      initialRouteName='Dashboard'>
      <Screen
        name='Dashboard'
        component={DashboardScreen}
        options={{title: 'Dashboard'}}
      />
      <Screen
        name='CourseList'
        component={CourseListScreen}
        options={{title: 'Courses'}}
      />
      <Screen
        name='CourseCreate'
        component={CourseCreateScreen}
        options={{title: 'Course create'}}
      />
      <Screen
        name='CourseDetail'
        component={CourseDetailScreen}
        options={{title: 'Course details'}}
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
      height: 70,
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
}

export type BackOfficeNavigatorParams =
  NavigatorScreenParams<BackOfficeScreenParamList>

export type CourseCreateRouteProp = RouteProp<
  BackOfficeScreenParamList,
  'CourseCreate'
>

export type CourseDetailRouteProp = RouteProp<
  BackOfficeScreenParamList,
  'CourseDetail'
>
