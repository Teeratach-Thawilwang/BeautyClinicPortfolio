import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigatorScreenParams} from '@react-navigation/native'

import TabNavigatorOption from '@navigation/TabNavigatorOption'
import AppointmentScreen from '@screens/AppointmentScreen'
import HomeScreen from '@screens/HomeScreen'
import MenuScreen from '@screens/MenuScreen'

const {Navigator, Screen} = createBottomTabNavigator<TabScreenParamList>()

export default function TabScreens() {
  return (
    <Navigator
      key='TabScreens'
      screenOptions={TabNavigatorOption}
      initialRouteName='Home'>
      <Screen name='Home' component={HomeScreen} />
      <Screen name='Appointment' component={AppointmentScreen} />
      <Screen name='Menu' component={MenuScreen} />
    </Navigator>
  )
}

export type TabScreenParamList = {
  Home: undefined
  Appointment: undefined
  Menu: undefined
}

export type TabNavigatorRouteProp = NavigatorScreenParams<TabScreenParamList>
