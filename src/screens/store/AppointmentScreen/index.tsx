import React, {useState} from 'react'
import {useWindowDimensions} from 'react-native'
import {SceneMap, TabBar, TabView} from 'react-native-tab-view'

import {useTheme} from '@context-providers/ThemeProvider'
import {AppointmentScreenRouteProp} from '@navigation/bottom-tab/BottomTabNavigator'

import BookingView from './Components/BookingView'
import CustomerCourseView from './Components/CustomerCourseView'

const routes = [
  {key: 'first', title: 'Course'},
  {key: 'second', title: 'My Booking'},
]

export default function AppointmentScreen({
  route,
}: {
  route: AppointmentScreenRouteProp
}) {
  const {theme} = useTheme()
  const {width} = useWindowDimensions()
  const tab = route.params?.tab ?? 'Course'
  const [index, setIndex] = useState(tab == 'Course' ? 0 : 1)

  return (
    <TabView
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      initialLayout={{width: width}}
      renderScene={SceneMap({
        first: CustomerCourseView,
        second: BookingView,
      })}
      renderTabBar={(props: any) => (
        <TabBar
          {...props}
          indicatorStyle={{
            marginHorizontal: 20,
            width: width / 2 - 40,
            backgroundColor: theme.colors.primary,
          }}
          style={{backgroundColor: theme.colors.surface}}
          activeColor={theme.colors.onSurface}
          inactiveColor={theme.colors.onSurfaceVariant}
        />
      )}
      commonOptions={{
        labelStyle: {fontSize: theme.fontSize.label},
      }}
    />
  )
}
