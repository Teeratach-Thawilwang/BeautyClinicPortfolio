import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigatorScreenParams} from '@react-navigation/native'
import React from 'react'

import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'
import BackOfficeDrawer from '@navigation/BackOfficeDrawer'
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
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor:
            responsive == 'MOBILE' ? 'transparent' : theme.colors.surface,
          borderColor: theme.colors.outline,
          width: responsive == 'MOBILE' ? width * 0.7 : width * 0.2,
        },
        drawerType: responsive == 'MOBILE' ? 'front' : 'permanent',
        swipeEdgeWidth: width * 0.8,
        swipeMinDistance: width * 0.1,
      }}
      initialRouteName='Dashboard'>
      <Screen name='Dashboard' component={DashboardScreen} />
      <Screen name='CourseList' component={CourseListScreen} />
    </Navigator>
  )
}

export type BackOfficeScreenParamList = {
  Dashboard: undefined
  CourseList: undefined
}

export type BackOfficeNavigatorParams =
  NavigatorScreenParams<BackOfficeScreenParamList>
