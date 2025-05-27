import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import React from 'react'
import {Icon} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {BottomTabNavigatorParamList} from '@navigation/bottom-tab/BottomTabNavigator'

type ButtonTabNavigatorOptionProps = {
  route: {
    name: keyof BottomTabNavigatorParamList
  }
}

export default function BottomTabNavigatorOption({
  route,
}: ButtonTabNavigatorOptionProps): BottomTabNavigationOptions {
  const {theme} = useTheme()

  return {
    tabBarIcon: ({
      focused,
      color,
      size,
    }: {
      focused: boolean
      color: string
      size: number
    }) => {
      const tabIconRoute = TabIconRoutes.filter(
        val => val.name === route.name,
      )[0]
      const iconName = focused
        ? tabIconRoute.focusedIcon
        : tabIconRoute.unfocusedIcon
      return <Icon source={iconName} size={size} color={color} />
    },
    tabBarActiveTintColor: theme.colors.onSurface,
    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
    tabBarStyle: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.outlineVariant,
    },
    headerShown: false,
    tabBarPosition: 'bottom',
    tabBarHideOnKeyboard: true,
  }
}

const TabIconRoutes = [
  {name: 'Home', focusedIcon: 'ant-home', unfocusedIcon: 'ant-home'},
  {
    name: 'Appointment',
    focusedIcon: 'ant-calendar',
    unfocusedIcon: 'ant-calendar',
  },
  {name: 'Menu', focusedIcon: 'text-account', unfocusedIcon: 'text-account'},
]
