import {User} from '@supabase/supabase-js'
import React from 'react'

import {useNavigate} from '@hooks/CommonHooks'
import ResetPasswordScreen from '@screens/ResetPasswordScreen'
import AuthenticationService from '@services/AuthenticationService'
import {act, fireEvent, render} from '@utils/TestUtil'

jest.mock(
  '@components/Authentication/ResetPasswordForm',
  () =>
    ({onSuccess}: {onSuccess: () => void}) => {
      const {Text, Button} = jest.requireActual('react-native-paper')
      return (
        <>
          <Text>ResetPasswordForm</Text>
          <Button onPress={onSuccess}>ResetPassword Button</Button>
        </>
      )
    },
)

describe('ResetPasswordScreen', () => {
  it('should render ActivityIndicator at first time render', async () => {
    jest
      .spyOn(require('@hooks/CommonHooks'), 'useEffectScreen')
      .mockImplementation(() => null)

    const {getByText, getByRole} = render(
      <ResetPasswordScreen
        route={{
          key: 'ResetPasswordScreenKey',
          name: 'ResetPasswordScreen',
          params: {token_hash: 'mock_token'},
        }}
      />,
    )
    expect(getByText('Beauty')).toBeTruthy()
    expect(getByText('Clinic')).toBeTruthy()
    expect(getByRole('progressbar')).toBeTruthy()
  })

  it('should navigate to HomeScreen when isFirstRender is true, user is not null, error is null', async () => {
    jest.spyOn(AuthenticationService, 'getUser').mockReturnValue({} as User)
    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const signOutSpy = jest
      .spyOn(AuthenticationService, 'signOut')
      .mockResolvedValue({success: true, data: null, error: null})

    const mockReplace = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue({replace: mockReplace})

    render(
      <ResetPasswordScreen
        route={{
          key: 'ResetPasswordScreenKey',
          name: 'ResetPasswordScreen',
          params: {token_hash: 'mock_token'},
        }}
      />,
    )

    expect(mockReplace).toHaveBeenCalledWith('BottomTabScreens', {
      screen: 'Home',
    })
    expect(signOutSpy).toHaveBeenCalledTimes(0)
  })

  it('should render ResetPasswordForm when isFirstRender is false, user is not null, error is null', async () => {
    jest
      .spyOn(AuthenticationService, 'getUser')
      .mockReturnValueOnce(null)
      .mockReturnValue({} as User)
    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const signOutSpy = jest
      .spyOn(AuthenticationService, 'signOut')
      .mockResolvedValue({success: true, data: null, error: null})

    const verifyRecoveryTokenSpy = jest
      .spyOn(AuthenticationService, 'verifyRecoveryToken')
      .mockImplementation(() =>
        Promise.resolve({success: true, data: null, error: null}),
      )

    const {getByText, unmount} = render(
      <ResetPasswordScreen
        route={{
          key: 'ResetPasswordScreenKey',
          name: 'ResetPasswordScreen',
          params: {token_hash: 'mock_token'},
        }}
      />,
    )

    expect(getByText('ResetPasswordForm')).toBeTruthy()
    expect(getByText('ResetPassword Button')).toBeTruthy()
    expect(verifyRecoveryTokenSpy).toHaveBeenCalledTimes(1)
    expect(signOutSpy).toHaveBeenCalledTimes(0)

    act(() => {
      unmount()
    })

    expect(signOutSpy).toHaveBeenCalledTimes(1)
  })

  it('should render ResetPasswordError when isFirstRender is false, user is null, error is not null', async () => {
    jest.spyOn(AuthenticationService, 'getUser').mockReturnValue(null)
    jest
      .spyOn(AuthenticationService, 'getError')
      .mockReturnValueOnce(null)
      .mockReturnValue('some error text')

    const signOutSpy = jest
      .spyOn(AuthenticationService, 'signOut')
      .mockResolvedValue({success: true, data: null, error: null})

    const verifyRecoveryTokenSpy = jest
      .spyOn(AuthenticationService, 'verifyRecoveryToken')
      .mockImplementation(() =>
        Promise.resolve({success: false, data: null, error: 'some error text'}),
      )

    const {getByText, unmount} = render(
      <ResetPasswordScreen
        route={{
          key: 'ResetPasswordScreenKey',
          name: 'ResetPasswordScreen',
          params: {token_hash: 'mock_token'},
        }}
      />,
    )

    expect(getByText('Reset Password')).toBeTruthy()
    expect(getByText('some error text')).toBeTruthy()
    expect(verifyRecoveryTokenSpy).toHaveBeenCalledTimes(1)
    expect(signOutSpy).toHaveBeenCalledTimes(0)

    act(() => {
      unmount()
    })

    expect(signOutSpy).toHaveBeenCalledTimes(1)
  })

  it('should not call signOut on unmount when isFirstRender is false, user is not null, error is null, reset-password button is pressed', async () => {
    jest
      .spyOn(AuthenticationService, 'getUser')
      .mockReturnValueOnce(null)
      .mockReturnValue({} as User)
    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const signOutSpy = jest
      .spyOn(AuthenticationService, 'signOut')
      .mockResolvedValue({success: true, data: null, error: null})

    const verifyRecoveryTokenSpy = jest
      .spyOn(AuthenticationService, 'verifyRecoveryToken')
      .mockImplementation(() =>
        Promise.resolve({success: true, data: null, error: null}),
      )

    const {getByText, unmount} = render(
      <ResetPasswordScreen
        route={{
          key: 'ResetPasswordScreenKey',
          name: 'ResetPasswordScreen',
          params: {token_hash: 'mock_token'},
        }}
      />,
    )

    expect(getByText('ResetPasswordForm')).toBeTruthy()
    expect(getByText('ResetPassword Button')).toBeTruthy()
    expect(verifyRecoveryTokenSpy).toHaveBeenCalledTimes(1)
    expect(signOutSpy).toHaveBeenCalledTimes(0)

    act(() => {
      fireEvent(getByText('ResetPassword Button'), 'press')
      unmount()
    })

    expect(signOutSpy).toHaveBeenCalledTimes(0)
  })
})
