import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {Icon} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {BottomTabNavigatorParamList, TabRoutes} from '@navigation/AppNavigator'

type TabNavigatorOptionProps = {
  route: RouteProp<BottomTabNavigatorParamList, keyof BottomTabNavigatorParamList>
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
