import React from 'react'
import {Keyboard} from 'react-native'

import SignUpForm from '@components/Authentication/SignUpForm'
import AuthenticationService from '@services/AuthenticationService'
import {act, fireEvent, render} from '@utils/TestUtil'

describe('SignUpForm', () => {
  it('should render elements correctly', async () => {
    const {getAllByTestId, getAllByText} = render(<SignUpForm />)

    const textInputs = getAllByTestId('text-input')
    const [title, button] = getAllByText('Create Account')

    expect(title).toBeTruthy()
    expect(button).toBeTruthy()
    expect(textInputs.length).toBe(4)
  })

  it('should call setState and display success or failed modal when sign up finish and close modal when backdrop press', async () => {
    const keyboardInstanct = jest.spyOn(Keyboard, 'dismiss')
    const mockSignUpWithEmail = jest
      .spyOn(AuthenticationService, 'signupWithEmail')
      .mockResolvedValue({success: true, data: null, error: null})
    jest.spyOn(AuthenticationService, 'getError').mockReturnValue(null)

    const {getAllByText, getAllByTestId, getByTestId, findByTestId, queryByText} = render(
      <SignUpForm />,
    )

    const view = getByTestId('sign-up-form')
    const textInputs = getAllByTestId('text-input')
    const [title, button] = getAllByText('Create Account')

    expect(title).toBeTruthy()

    fireEvent.changeText(textInputs[0], 'name')
    fireEvent.changeText(textInputs[1], 'test@example.com')
    fireEvent.changeText(textInputs[2], 'this password is very strong')
    fireEvent.changeText(textInputs[3], 'this password is very strong')

    await act(async () => {
      fireEvent(view, 'touchStart')
      fireEvent.press(button)
    })

    const modalTitle = 'Sign up successfully.'
    const modalText =
      'Please check your email inbox for a confirmation link to activate your account.'

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
