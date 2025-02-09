import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import React from 'react'
import {Icon} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {TabParamList} from '@navigation/TabScreens'

type TabNavigatorOptionProps = {
  route: {
    name: keyof TabParamList
  }
}

export default function TabNavigatorOption({route}: TabNavigatorOptionProps): BottomTabNavigationOptions {
  const {theme} = useTheme()

  return {
    tabBarIcon: ({focused, color, size}: {focused: boolean; color: string; size: number}) => {
      const tabRoute = TabRoutes.filter(val => val.name === route.name)[0]
      const iconName = focused ? tabRoute.focusedIcon : tabRoute.unfocusedIcon
      return <Icon source={iconName} size={size} color={color} />
    },
    tabBarActiveTintColor: theme.colors.onSurface,
    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
    tabBarStyle: {backgroundColor: theme.colors.background, borderColor: theme.colors.outlineVariant},
    headerShown: false,
    tabBarPosition: 'bottom',
    tabBarHideOnKeyboard: true,
  }
}

const TabRoutes = [
  {name: 'HomeScreen', focusedIcon: 'ant-home', unfocusedIcon: 'ant-home'},
  {name: 'AppointmentScreen', focusedIcon: 'ant-calendar', unfocusedIcon: 'ant-calendar'},
  {name: 'MenuScreen', focusedIcon: 'text-account', unfocusedIcon: 'text-account'},
]
