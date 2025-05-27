import React from 'react'

import ResetPasswordResponse from '@components/Authentication/ResetPasswordResponse'
import {useNavigate} from '@hooks/CommonHooks'
import AuthenticationService from '@services/AuthenticationService'
import {fireEvent, render} from '@utils/TestUtil'

describe('ResetPasswordResponse', () => {
  it('should render success modal when there is no error', () => {
    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const {getByText} = render(<ResetPasswordResponse isVisible={true} />)

    const title = getByText('Successfully.')
    const text = getByText('Your password has been updated.')
    const button = getByText('Continue')
    expect(title).toBeTruthy()
    expect(text).toBeTruthy()
    expect(button).toBeTruthy()
  })

  it('should render error modal when there is an error', () => {
    const errorText = 'some error text'

    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(errorText)

    const {getByText} = render(<ResetPasswordResponse isVisible={true} />)

    const title = getByText('Update Failed.')
    const text = getByText(errorText)
    const button = getByText('Continue')
    expect(title).toBeTruthy()
    expect(text).toBeTruthy()
    expect(button).toBeTruthy()
  })

  it('should replace screen to HomeScreen when there is no error and onButtonPress is Pressed', () => {
    const mockReplace = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue({replace: mockReplace})

    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const {getByText} = render(<ResetPasswordResponse isVisible={true} />)

    const title = getByText('Successfully.')
    const button = getByText('Continue')
    expect(title).toBeTruthy()
    expect(button).toBeTruthy()

    fireEvent.press(button)
    expect(mockReplace).toHaveBeenCalledWith('TabScreen', {screen: 'HomeScreen'})
  })

  it('should replace screen to ForgotPasswordScreen when there is an error and onButtonPress is Pressed', () => {
    const mockReplace = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue({replace: mockReplace})

    jest.spyOn(AuthenticationService, 'getError').mockReturnValue('some error text')

    const {getByText} = render(<ResetPasswordResponse isVisible={true} />)

    const title = getByText('Update Failed.')
    const button = getByText('Continue')
    expect(title).toBeTruthy()
    expect(button).toBeTruthy()

    fireEvent.press(button)
    expect(mockReplace).toHaveBeenCalledWith('ForgotPasswordScreen')
  })
})
