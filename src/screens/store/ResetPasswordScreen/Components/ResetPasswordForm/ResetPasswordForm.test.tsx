import React from 'react'
import {Keyboard} from 'react-native'

import ResetPasswordForm from '@components/Authentication/ResetPasswordForm'
import AuthService from '@services/AuthService'
import {act, fireEvent, render} from '@utils/TestUtil'

describe('ResetPasswordForm', () => {
  it('should render elements correctly', async () => {
    const mockOnSuccess = jest.fn()
    const {getAllByTestId, getByText} = render(
      <ResetPasswordForm email='test@email.com' onSuccess={mockOnSuccess} />,
    )

    const textInputs = getAllByTestId('text-input')
    const title = getByText('Create new password')
    const button = getByText('Reset Password')

    expect(title).toBeTruthy()
    expect(button).toBeTruthy()
    expect(textInputs.length).toBe(3)
  })

  it('should call onSuccess and display success modal when update password finished', async () => {
    const mockOnSuccess = jest.fn()
    const keyboardInstanct = jest.spyOn(Keyboard, 'dismiss')
    const mockUpdatePassword = jest
      .spyOn(AuthService, 'updatePassword')
      .mockResolvedValue({success: true, data: null, error: null})
    jest.spyOn(AuthService, 'getError').mockReturnValue(null)

    const {getByText, getByTestId, getAllByTestId, findByTestId, queryByText} =
      render(
        <ResetPasswordForm email='test@email.com' onSuccess={mockOnSuccess} />,
      )

    const view = getByTestId('reset-password-form')
    const textInputs = getAllByTestId('text-input')
    const title = getByText('Create new password')
    const button = getByText('Reset Password')

    expect(title).toBeTruthy()
    expect(button).toBeTruthy()

    fireEvent.changeText(textInputs[0], 'test@example.com')
    fireEvent.changeText(textInputs[1], 'this is valid password')
    fireEvent.changeText(textInputs[2], 'this is valid password')

    await act(async () => {
      fireEvent(view, 'touchStart')
      fireEvent.press(button)
    })

    const modalTitle = 'Successfully.'
    const modalText = 'Your password has been updated.'

    const modal = await findByTestId('react-native-modal-mock')
    const modalTitleElement = queryByText(modalTitle)
    const modalTextElement = queryByText(modalText)
    const modalButtonElement = queryByText('Continue')

    expect(modal).toBeTruthy()
    expect(modalTitleElement).toBeTruthy()
    expect(modalTextElement).toBeTruthy()
    expect(modalButtonElement).toBeTruthy()
    expect(keyboardInstanct).toHaveBeenCalledTimes(1)
    expect(mockUpdatePassword).toHaveBeenCalledTimes(1)
    expect(mockOnSuccess).toHaveBeenCalledTimes(1)
  })

  it('should not call onSuccess and display failed modal when update password finished', async () => {
    const errorText = 'some error text'
    const mockOnSuccess = jest.fn()
    const keyboardInstanct = jest.spyOn(Keyboard, 'dismiss')
    const mockUpdatePassword = jest
      .spyOn(AuthService, 'updatePassword')
      .mockResolvedValue({success: false, data: null, error: errorText})
    jest.spyOn(AuthService, 'getError').mockReturnValue(errorText)

    const {getByText, getByTestId, getAllByTestId, findByTestId, queryByText} =
      render(
        <ResetPasswordForm email='test@email.com' onSuccess={mockOnSuccess} />,
      )

    const view = getByTestId('reset-password-form')
    const textInputs = getAllByTestId('text-input')
    const title = getByText('Create new password')
    const button = getByText('Reset Password')

    expect(title).toBeTruthy()
    expect(button).toBeTruthy()

    fireEvent.changeText(textInputs[0], 'test@example.com')
    fireEvent.changeText(textInputs[1], 'invalid password make request failed')
    fireEvent.changeText(textInputs[2], 'invalid password make request failed')

    await act(async () => {
      fireEvent(view, 'touchStart')
      fireEvent.press(button)
    })

    const modalTitle = 'Update Failed.'

    const modal = await findByTestId('react-native-modal-mock')
    const modalTitleElement = queryByText(modalTitle)
    const modalTextElement = queryByText(errorText)
    const modalButtonElement = queryByText('Continue')

    expect(modal).toBeTruthy()
    expect(modalTitleElement).toBeTruthy()
    expect(modalTextElement).toBeTruthy()
    expect(modalButtonElement).toBeTruthy()
    expect(keyboardInstanct).toHaveBeenCalledTimes(1)
    expect(mockUpdatePassword).toHaveBeenCalledTimes(1)
    expect(mockOnSuccess).toHaveBeenCalledTimes(0)
  })
})
