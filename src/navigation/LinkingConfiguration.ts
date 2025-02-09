import {LinkingOptions} from '@react-navigation/native'

import {RootStackParamList} from '@navigation/AppNavigator'

const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
  prefixes: ['beauty-clinic-portfolio://'],
  config: {
    screens: {
      ResetPasswordScreen: 'reset-password',
      ConfirmSignupScreen: 'confirm-signup',
    },
  },
}

export default LinkingConfiguration
