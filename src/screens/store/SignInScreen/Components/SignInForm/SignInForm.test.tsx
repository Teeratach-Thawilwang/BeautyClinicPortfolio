import React from 'react'
import {Keyboard} from 'react-native'

import SignInForm from '@components/Authentication/SignInForm'
import {useNavigate} from '@hooks/CommonHooks'
import AuthService from '@services/AuthService'
import {act, fireEvent, render, waitFor} from '@utils/TestUtil'

describe('SignInForm', () => {
  it('should render elements correctly', () => {
    const {getByText, getAllByTestId} = render(<SignInForm />)

    const title = getByText('Hi, Welcome Back!')
    const button = getByText('Sign In')
    const textInputs = getAllByTestId('text-input')

    expect(title).toBeTruthy()
    expect(button).toBeTruthy()
    expect(textInputs.length).toBe(2)
  })

  it('should call navigate when authentication success', async () => {
    const keyboardInstanct = jest.spyOn(Keyboard, 'dismiss')
    jest
      .spyOn(AuthService, 'signinWithEmail')
      .mockResolvedValue({success: true, data: null, error: null})

    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue({navigate: mockNavigate})

    const {getByText, getAllByTestId, getByTestId} = render(<SignInForm />)

    const view = getByTestId('sign-in-form')
    const textInputs = getAllByTestId('text-input')
    const button = getByText('Sign In')

    fireEvent.changeText(textInputs[0], 'test@example.com')
    fireEvent.changeText(textInputs[1], 'this password is very strong')

    await act(async () => {
      fireEvent(view, 'touchStart')
      fireEvent.press(button)
    })

    await waitFor(() => {
      expect(keyboardInstanct).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('BottomTabScreens', {
        screen: 'Home',
      })
    })
  })

  it('should call setState to open when authentication fails and close modal when backdrop press', async () => {
    const errorText = 'some error text'
    const keyboardInstanct = jest.spyOn(Keyboard, 'dismiss')
    const mockSigninWithEmail = jest
      .spyOn(AuthService, 'signinWithEmail')
      .mockResolvedValue({success: false, data: null, error: errorText})
    jest.spyOn(AuthService, 'getError').mockReturnValue(errorText)

    const {findByTestId, queryByText, getByText, getAllByTestId} = render(
      <SignInForm />,
    )
    const button = getByText('Sign In')
    const textInputs = getAllByTestId('text-input')

    await act(async () => {
      fireEvent.changeText(textInputs[0], 'test@example.com')
      fireEvent.changeText(
        textInputs[1],
        'password is invalid to make failed request',
      )
      fireEvent.press(button)
    })

    const modal = await findByTestId('react-native-modal-mock')
    const modalTitle = queryByText('Sign In Failed.')
    const modalText = queryByText(errorText)

    expect(modal).toBeTruthy()
    expect(modalTitle).toBeTruthy()
    expect(modalText).toBeTruthy()
    expect(mockSigninWithEmail).toHaveBeenCalledTimes(1)

    await act(async () => {
      fireEvent(modal, 'onBackdropPress')
    })

    expect(queryByText('Sign In Failed.')).toBeNull()
    expect(queryByText(errorText)).toBeNull()
    expect(keyboardInstanct).toHaveBeenCalledTimes(1)
  })
})
