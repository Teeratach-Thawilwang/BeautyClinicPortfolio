import {RouteProp} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import AppointmentScreen from '@screens/AppointmentScreen'

const {Navigator, Screen} = createNativeStackNavigator<AppointmentStackNavigatorParamList>()

export default function AppointmentStackNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName='AppointmentScreen'>
      <Screen name='AppointmentScreen' component={AppointmentScreen} />
    </Navigator>
  )
}

export type AppointmentStackNavigatorParamList = {
  AppointmentScreen: undefined
}

export type AppointmentScreenNavigationProp = RouteProp<AppointmentStackNavigatorParamList, 'AppointmentScreen'>
