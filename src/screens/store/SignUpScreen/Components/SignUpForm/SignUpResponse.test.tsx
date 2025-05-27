import React from 'react'
import {useForm} from 'react-hook-form'

import SignUpResponse from '@components/Authentication/SignUpResponse'
import AuthService from '@services/AuthService'
import {act, fireEvent, render, renderHook, waitFor} from '@utils/TestUtil'

describe('SignUpResponse', () => {
  it('should render success modal when there is no error', () => {
    const {result} = renderHook(() => useForm())

    jest.spyOn(AuthService, 'getError').mockReturnValue(null)
    jest
      .spyOn(AuthService, 'resendConfirmSignup')
      .mockResolvedValue({success: true, data: null, error: null})

    const {getByText} = render(
      <SignUpResponse
        isVisible={true}
        onDismiss={jest.fn()}
        control={result.current.control}
      />,
    )

    const title = getByText('Sign up successfully.')
    const text = getByText(
      'Please check your email inbox for a confirmation link to activate your account.',
    )
    const resendButton = getByText('Resend')
    expect(title).toBeTruthy()
    expect(text).toBeTruthy()
    expect(resendButton).toBeTruthy()
  })

  it('should render error modal when there is an error', () => {
    const {result} = renderHook(() => useForm())
    const errorText = 'some error text'

    jest.spyOn(AuthService, 'getError').mockReturnValue(errorText)

    const {getByText} = render(
      <SignUpResponse
        isVisible={true}
        onDismiss={jest.fn()}
        control={result.current.control}
      />,
    )

    const title = getByText('Sign In Failed.')
    const text = getByText(errorText)
    expect(title).toBeTruthy()
    expect(text).toBeTruthy()
  })

  it('should call resendConfirmSignup when Resend button is pressed', async () => {
    jest.spyOn(AuthService, 'getError').mockReturnValue(null)
    jest
      .spyOn(AuthService, 'resendConfirmSignup')
      .mockImplementation(() =>
        Promise.resolve({success: true, data: null, error: null}),
      )

    const {result} = renderHook(() =>
      useForm({
        defaultValues: {email: 'test@example.com'},
      }),
    )

    const {getByText} = render(
      <SignUpResponse
        isVisible={true}
        onDismiss={jest.fn()}
        control={result.current.control}
      />,
    )

    const resendButton = getByText('Resend')
    expect(resendButton).toBeTruthy()

    await act(async () => {
      fireEvent.press(resendButton)
    })

    await waitFor(async () =>
      expect(AuthService.resendConfirmSignup).toHaveBeenCalledWith(
        'test@example.com',
      ),
    )
  })

  it('should call onDismiss when backdrop is pressed', async () => {
    const mockOnDismiss = jest.fn()
    jest.spyOn(AuthService, 'getError').mockReturnValue(null)
    jest
      .spyOn(AuthService, 'resendConfirmSignup')
      .mockImplementation(() =>
        Promise.resolve({success: true, data: null, error: null}),
      )

    const {result} = renderHook(() =>
      useForm({
        defaultValues: {email: 'test@example.com'},
      }),
    )

    const {getByTestId} = render(
      <SignUpResponse
        isVisible={true}
        onDismiss={mockOnDismiss}
        control={result.current.control}
      />,
    )

    const modal = getByTestId('react-native-modal-mock')
    await act(async () => {
      fireEvent(modal, 'onBackdropPress')
    })

    await waitFor(async () => expect(mockOnDismiss).toHaveBeenCalledTimes(1))
  })
})
