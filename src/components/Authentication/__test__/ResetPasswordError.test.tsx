import React from 'react'

import ResetPasswordError from '@components/Authentication/ResetPasswordError'
import {useNavigate} from '@hooks/CommonHooks'
import {fireEvent, render} from '@utils/TestUtil'

describe('ResetPasswordError', () => {
  it('should render elements correctly', () => {
    const errorText = 'some error text'

    const {getByText} = render(<ResetPasswordError error={errorText} />)

    const title = getByText('Reset Password')
    const text = getByText(errorText)
    const inlineText = getByText('Try again ? ')
    const inlineLink = getByText('Forgot Password')
    const homeButton = getByText('Home')
    expect(title).toBeTruthy()
    expect(text).toBeTruthy()
    expect(inlineText).toBeTruthy()
    expect(inlineLink).toBeTruthy()
    expect(homeButton).toBeTruthy()
  })

  it('should replace screen to ForgotPasswordScreen when inline-link pressed', () => {
    const mockReplace = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue({replace: mockReplace})

    const {getByText} = render(<ResetPasswordError error='some error text' />)

    const inlineLink = getByText('Forgot Password')
    fireEvent.press(inlineLink)

    expect(mockReplace).toHaveBeenCalledWith('ForgotPasswordScreen')
  })

  it('should replace screen to HomeScreen when home button pressed', () => {
    const mockReplace = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue({replace: mockReplace})

    const {getByText} = render(<ResetPasswordError error='some error text' />)

    const homeButton = getByText('Home')
    fireEvent.press(homeButton)

    expect(mockReplace).toHaveBeenCalledWith('TabScreen', {screen: 'HomeScreen'})
  })
})
