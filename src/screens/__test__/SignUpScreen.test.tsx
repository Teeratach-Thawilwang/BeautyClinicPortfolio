import React from 'react'

import {useNavigate} from '@hooks/CommonHooks'
import SignUpScreen from '@screens/SignUpScreen'
import {fireEvent, render} from '@utils/TestUtil'

describe('SignUpScreen', () => {
  it('should render all components correctly', () => {
    const {getByText, getAllByText} = render(<SignUpScreen />)

    expect(getByText('Beauty')).toBeTruthy()
    expect(getByText('Clinic')).toBeTruthy()
    expect(getAllByText('Create Account').length).toBe(2)
    expect(getByText('or')).toBeTruthy()
    expect(getByText('Sign In with Google')).toBeTruthy()
    expect(getByText('Do you have an account ?')).toBeTruthy()
    expect(getByText('Sign In')).toBeTruthy()
  })

  it('should navigate to SignInScreen when sign-in button is pressed', () => {
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue({navigate: mockNavigate})

    const {getByText} = render(<SignUpScreen />)

    const button = getByText('Sign In')
    fireEvent.press(button)

    expect(mockNavigate).toHaveBeenCalledWith('SignInScreen')
  })

  it('should call googleSignInHandler when google sign-in button is pressed', () => {
    const mockGoogleSignInHandler = jest
      .spyOn(require('@hooks/CommonHooks'), 'googleSignInHandler')
      .mockImplementation(() => null)

    const {getByText} = render(<SignUpScreen />)

    const button = getByText('Sign In with Google')
    fireEvent.press(button)

    expect(mockGoogleSignInHandler).toHaveBeenCalledTimes(1)
  })
})
