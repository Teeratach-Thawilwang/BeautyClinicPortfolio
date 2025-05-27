import SplashScreen from 'react-native-splash-screen'

import {configureSplashScreen} from '@utils/SplashScreenConfig'

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}))

jest.unmock('@utils/SplashScreenConfig')

describe('SplashScreenConfig', () => {
  it('should call SplashScreen.hide when platform is Android', () => {
    jest
      .spyOn(require('@utils/Helpers'), 'getPlatFormOS')
      .mockReturnValue('android')

    configureSplashScreen()

    expect(SplashScreen.hide).toHaveBeenCalledTimes(1)
  })

  it('should not call SplashScreen.hide when platform is iOS', () => {
    jest
      .spyOn(require('@utils/Helpers'), 'getPlatFormOS')
      .mockReturnValue('ios')

    configureSplashScreen()

    expect(SplashScreen.hide).not.toHaveBeenCalled()
  })
})
