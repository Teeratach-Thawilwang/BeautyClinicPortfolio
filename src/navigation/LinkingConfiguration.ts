import {LinkingOptions} from '@react-navigation/native'

import {RootStackParamList} from '@navigation/AppNavigator'

const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
  prefixes: [process.env.APP_LINK!],
  config: {
    screens: {
      ResetPasswordScreen: 'reset-password',
      ConfirmSignupScreen: 'confirm-signup',
      PaymentScreen: 'payment',
      BottomTabScreens: {
        screens: {
          Home: 'home',
        },
      },
    },
  },
}

export default LinkingConfiguration
