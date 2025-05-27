import React from 'react'

import {useNavigate} from '@hooks/CommonHooks'
import SignInScreen from '@screens/SignInScreen'
import {fireEvent, render} from '@utils/TestUtil'

describe('SignInScreen', () => {
  it('should render all components correctly', () => {
    const {getByText} = render(<SignInScreen />)

    expect(getByText('Beauty')).toBeTruthy()
    expect(getByText('Clinic')).toBeTruthy()
    expect(getByText('Hi, Welcome Back!')).toBeTruthy()
    expect(getByText('or')).toBeTruthy()
    expect(getByText('Sign In with Google')).toBeTruthy()
    expect(getByText('Forgot password ?')).toBeTruthy()
    expect(getByText("Don't have an account yet ?")).toBeTruthy()
    expect(getByText('Sign Up')).toBeTruthy()
  })

  it('should navigate to ForgotPasswordScreen when forgot-password button is pressed', () => {
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue({navigate: mockNavigate})

    const {getByText} = render(<SignInScreen />)

    const button = getByText('Forgot password ?')
    fireEvent.press(button)

    expect(mockNavigate).toHaveBeenCalledWith('ForgotPasswordScreen')
  })

  it('should navigate to SignUpScreen when sign-up button is pressed', () => {
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue({navigate: mockNavigate})

    const {getByText} = render(<SignInScreen />)

    const button = getByText('Sign Up')
    fireEvent.press(button)

    expect(mockNavigate).toHaveBeenCalledWith('SignUpScreen')
  })

  it('should call googleSignInHandler when google sign-in button is pressed', () => {
    const mockGoogleSignInHandler = jest
      .spyOn(require('@hooks/CommonHooks'), 'googleSignInHandler')
      .mockImplementation(() => null)

    const {getByText} = render(<SignInScreen />)

    const button = getByText('Sign In with Google')
    fireEvent.press(button)

    expect(mockGoogleSignInHandler).toHaveBeenCalledTimes(1)
  })
})
