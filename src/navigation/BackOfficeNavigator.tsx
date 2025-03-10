import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigatorScreenParams} from '@react-navigation/native'
import React from 'react'
import {useWindowDimensions} from 'react-native'

import BackOfficeDrawer from '@navigation/BackOfficeDrawer'
import CourseListScreen from '@screens/CourseListScreen'
import DashboardScreen from '@screens/DashboardScreen'
import {getResponsiveScreen} from '@utils/Helpers'

const {Navigator, Screen} = createDrawerNavigator<BackOfficeScreenParamList>()

export default function BackOfficeNavigator() {
  const {width} = useWindowDimensions()
  const responsiveScreen = getResponsiveScreen(width)

  return (
    <Navigator
      key='BackOfficeNavigator'
      drawerContent={props => <BackOfficeDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'transparent',
          width: responsiveScreen == 'MOBILE' ? width * 0.9 : width * 0.4,
        },
        drawerType: responsiveScreen == 'MOBILE' ? 'front' : 'permanent',
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
