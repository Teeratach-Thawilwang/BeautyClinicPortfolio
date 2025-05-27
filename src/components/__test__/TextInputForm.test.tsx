import React from 'react'
import {FieldError, useForm} from 'react-hook-form'

import TextInputForm from '@components/TextInputForm'
import {fireEvent, render, renderHook} from '@utils/TestUtil'

describe('TextInputForm', () => {
  it('should render TextInput correctly', () => {
    const {result} = renderHook(() => useForm())
    const {getByTestId} = render(
      <TextInputForm
        label='Email'
        name='email'
        icon='email'
        control={result.current.control}
        error={undefined}
      />,
    )

    expect(getByTestId('text-input')).toBeTruthy()
  })

  it('shows and hides password when press eye-icon', () => {
    const {result} = renderHook(() => useForm())
    const {getByTestId} = render(
      <TextInputForm
        label='Password'
        name='password'
        icon='lock-outline'
        control={result.current.control}
        error={undefined}
        secureTextEntry
      />,
    )

    const input = getByTestId('text-input')
    const eyeIcon = getByTestId('secure-text-icon')

    expect(input.props.secureTextEntry).toBe(true)

    fireEvent.press(eyeIcon)
    expect(input.props.secureTextEntry).toBe(false)

    fireEvent.press(eyeIcon)
    expect(input.props.secureTextEntry).toBe(true)
  })

  it('should displays error message when there is an error', () => {
    const {result} = renderHook(() => useForm())
    const {getByText} = render(
      <TextInputForm
        label='Email'
        name='email'
        icon='email'
        control={result.current.control}
        error={{message: 'This field is required'} as FieldError}
      />,
    )

    expect(getByText('This field is required')).toBeTruthy()
  })

  it('should call onChangeText correctly', () => {
    const {result} = renderHook(() => useForm())

    const {getByTestId} = render(
      <TextInputForm
        label='Confirm Password'
        name='confirmPassword'
        icon='lock-outline'
        control={result.current.control}
        error={undefined}
      />,
    )

    const input = getByTestId('text-input')
    fireEvent.changeText(input, 'this password is very strong')

    expect(result.current.getValues('confirmPassword')).toBe(
      'this password is very strong',
    )
  })
})
