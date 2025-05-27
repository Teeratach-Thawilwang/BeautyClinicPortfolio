import React from 'react'
import {Image} from 'react-native'

import Button from '@components/Button'
import {act, fireEvent, render, waitFor} from '@utils/TestUtil'

describe('Button', () => {
  it('should render correctly with text', () => {
    const {getByText} = render(<Button onPress={jest.fn()}>Press Me</Button>)
    expect(getByText('Press Me')).toBeTruthy()
  })

  it('should call onPress when clicked', () => {
    const onPressMock = jest.fn()
    const {getByText} = render(<Button onPress={onPressMock}>Press Me</Button>)

    fireEvent.press(getByText('Press Me'))
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('should changes isLoading state when button is pressed', async () => {
    const onPress = jest.fn(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })
    const {getByText, queryByRole} = render(
      <Button onPress={onPress} useLoading={true}>
        Press Me
      </Button>,
    )

    act(() => {
      fireEvent.press(getByText('Press Me'))
    })

    expect(queryByRole('progressbar')).toBeTruthy()

    act(() => {
      jest.advanceTimersByTime(20)
    })

    await waitFor(() => {
      expect(queryByRole('progressbar')).toBeNull()
    })
  })

  it('should render an image components when icon is passed', () => {
    const icon = require('@assets/images/google_icon.png')
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    render(
      <Button onPress={() => {}} icon={icon}>
        Press Me
      </Button>,
    )

    expect(Image).toHaveBeenCalled()
  })

  it('should not render image components when icon props not provided', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    render(<Button onPress={() => {}}>Press Me</Button>)
    expect(Image).not.toHaveBeenCalled()
  })
})
