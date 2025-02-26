import React from 'react'
import {Keyboard} from 'react-native'

import ForgotPasswordForm from '@components/Authentication/ForgotPasswordForm'
import AuthenticationService from '@services/AuthenticationService'
import {act, fireEvent, render} from '@utils/TestUtil'

describe('ForgotPasswordForm', () => {
  it('should render elements correctly', async () => {
    const {getAllByTestId, getByText} = render(<ForgotPasswordForm />)

    const textInputs = getAllByTestId('text-input')
    const title = getByText('Forgot Password ?')
    const text = getByText('Enter your email. We will send you a link to reset password.')
    const button = getByText('Reset Password')

    expect(title).toBeTruthy()
    expect(text).toBeTruthy()
    expect(button).toBeTruthy()
    expect(textInputs.length).toBe(1)
  })

  it('should call setState and display success or failed modal when sign up finish and close modal when backdrop press', async () => {
    const keyboardInstanct = jest.spyOn(Keyboard, 'dismiss')
    const mockSignUpWithEmail = jest
      .spyOn(AuthenticationService, 'forgotPassword')
      .mockResolvedValue({success: true, data: null, error: null})
    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const {getByText, getByTestId, findByTestId, queryByText} = render(
      <ForgotPasswordForm />,
    )

    const view = getByTestId('forgot-password-form')
    const textInput = getByTestId('text-input')
    const title = getByText('Forgot Password ?')
    const button = getByText('Reset Password')

    expect(title).toBeTruthy()
    expect(button).toBeTruthy()

    fireEvent.changeText(textInput, 'test@example.com')

    await act(async () => {
      fireEvent(view, 'touchStart')
      fireEvent.press(button)
    })

    const modalTitle = 'Reset Password.'
    const modalText =
      'You will shortly receive an email with a link to reset your password.'

    const modal = await findByTestId('react-native-modal-mock')
    const modalTitleElement = queryByText(modalTitle)
    const modalTextElement = queryByText(modalText)

    expect(modal).toBeTruthy()
    expect(modalTitleElement).toBeTruthy()
    expect(modalTextElement).toBeTruthy()
    expect(mockSignUpWithEmail).toHaveBeenCalledTimes(1)
    expect(keyboardInstanct).toHaveBeenCalledTimes(1)

    await act(async () => {
      fireEvent(modal, 'onBackdropPress')
    })

    expect(queryByText(modalTitle)).toBeNull()
    expect(queryByText(modalText)).toBeNull()
  })
})
