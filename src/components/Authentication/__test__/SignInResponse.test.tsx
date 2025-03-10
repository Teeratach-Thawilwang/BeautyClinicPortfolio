import React from 'react'

import SignInResponse from '@components/Authentication/SignInResponse'
import AuthenticationService from '@services/AuthenticationService'
import {act, fireEvent, render, waitFor} from '@utils/TestUtil'

describe('SignInResponse', () => {
  it('should render null when there is no error', () => {
    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const {queryByText} = render(
      <SignInResponse isVisible={true} onDismiss={jest.fn()} />,
    )

    const title = queryByText('Sign In Failed.')
    expect(title).toBeNull()
  })

  it('should render error modal when there is an error', () => {
    const errorText = 'some error text'

    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(errorText)

    const {getByText} = render(
      <SignInResponse isVisible={true} onDismiss={jest.fn()} />,
    )

    const title = getByText('Sign In Failed.')
    const text = getByText(errorText)
    expect(title).toBeTruthy()
    expect(text).toBeTruthy()
  })

  it('should call onDismiss when backdrop is pressed', async () => {
    const mockOnDismiss = jest.fn()
    jest
      .spyOn(AuthenticationService, 'getError')
      .mockReturnValue('some error text')

    const {getByTestId} = render(
      <SignInResponse isVisible={true} onDismiss={mockOnDismiss} />,
    )

    const modal = getByTestId('react-native-modal-mock')
    await act(async () => {
      fireEvent(modal, 'onBackdropPress')
    })

    await waitFor(async () => expect(mockOnDismiss).toHaveBeenCalledTimes(1))
  })
})
