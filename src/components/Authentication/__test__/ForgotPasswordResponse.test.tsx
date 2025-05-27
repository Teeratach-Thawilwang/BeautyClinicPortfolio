import React from 'react'

import ForgotPasswordResponse from '@components/Authentication/ForgotPasswordResponse'
import AuthenticationService from '@services/AuthenticationService'
import {act, fireEvent, render, waitFor} from '@utils/TestUtil'

describe('ForgotPasswordResponse', () => {
  it('should render success modal when there is no error', () => {
    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const {getByText} = render(
      <ForgotPasswordResponse isVisible={true} onDismiss={jest.fn()} />,
    )

    const title = getByText('Reset Password.')
    const text = getByText(
      'You will shortly receive an email with a link to reset your password.',
    )
    expect(title).toBeTruthy()
    expect(text).toBeTruthy()
  })

  it('should render error modal when there is an error', () => {
    const errorText = 'some error text'

    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(errorText)

    const {getByText} = render(
      <ForgotPasswordResponse isVisible={true} onDismiss={jest.fn()} />,
    )

    const title = getByText('Reset Password Failed.')
    const text = getByText(errorText)
    expect(title).toBeTruthy()
    expect(text).toBeTruthy()
  })

  it('should call onDismiss when backdrop is pressed', async () => {
    const mockOnDismiss = jest.fn()
    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const {getByTestId} = render(
      <ForgotPasswordResponse isVisible={true} onDismiss={mockOnDismiss} />,
    )

    const modal = getByTestId('react-native-modal-mock')
    await act(async () => {
      fireEvent(modal, 'onBackdropPress')
    })

    await waitFor(async () => expect(mockOnDismiss).toHaveBeenCalledTimes(1))
  })
})
