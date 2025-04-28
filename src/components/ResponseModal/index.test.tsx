import React from 'react'
import {Image} from 'react-native'

import ResponseModal from '@components/ResponseModal'
import {act, fireEvent, render} from '@utils/TestUtil'

describe('ResponseModal', () => {
  it('should render modal when visible is true', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    const {getByText, getByTestId} = render(
      <ResponseModal
        visible={true}
        title='Modal Title'
        text='Modal Text'
        buttonText='Press Me'
        imageSource={require('@assets/successfully_icon.png')}
        onButtonPress={jest.fn()}
        onDismiss={jest.fn()}
      />,
    )

    expect(getByText('Modal Title')).toBeTruthy()
    expect(getByText('Modal Text')).toBeTruthy()
    expect(getByTestId('react-native-modal-mock')).toBeTruthy()
    expect(Image).toHaveBeenCalledTimes(1)
  })

  it('should render correctly when isSuccess is true', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)
    const {getByText} = render(
      <ResponseModal
        visible={true}
        imageSource={require('@assets/images/successfully_icon.png')}
        title='Modal Title'
        text='Modal Text'
      />,
    )

    expect(getByText('Modal Title')).toBeTruthy()
    expect(getByText('Modal Text')).toBeTruthy()
    expect(Image).toHaveBeenCalledWith(
      {
        source: require('@assets/images/successfully_icon.png'),
        style: {
          alignSelf: 'center',
          height: 80,
          width: 80,
        },
      },
      {},
    )
  })

  it('should render correctly when isSuccess is false', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    const {getByText} = render(
      <ResponseModal
        visible={true}
        imageSource={require('@assets/images/failed_icon.png')}
        title='Modal Title'
        text='Modal Text'
      />,
    )

    expect(getByText('Modal Title')).toBeTruthy()
    expect(getByText('Modal Text')).toBeTruthy()
    expect(Image).toHaveBeenCalledWith(
      {
        source: require('@assets/images/failed_icon.png'),
        style: {
          alignSelf: 'center',
          height: 80,
          width: 80,
        },
      },
      {},
    )
  })

  it('should not render button when buttonText props not provided', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    const {getByText, queryByRole} = render(
      <ResponseModal
        visible={true}
        imageSource={require('@assets/images/failed_icon.png')}
        title='Modal Title'
        text='Modal Text'
      />,
    )

    expect(getByText('Modal Title')).toBeTruthy()
    expect(getByText('Modal Text')).toBeTruthy()
    expect(queryByRole('button')).toBeNull()
  })

  it('should call onButtonPress when button is pressed', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)
    const mockOnButtonPress = jest.fn()

    const {getByText} = render(
      <ResponseModal
        visible={true}
        title='Modal Title'
        text='Modal text'
        imageSource={require('@assets/images/successfully_icon.png')}
        buttonText='Press Me'
        onButtonPress={mockOnButtonPress}
      />,
    )

    fireEvent.press(getByText('Press Me'))
    expect(mockOnButtonPress).toHaveBeenCalledTimes(1)
  })

  it('should not error when button is pressed but buttonText provided and onButtonPress not provided', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    const {getByText} = render(
      <ResponseModal
        visible={true}
        title='Modal Title'
        text='Modal text'
        imageSource={require('@assets/images/successfully_icon.png')}
        buttonText='Press Me'
      />,
    )

    fireEvent.press(getByText('Press Me'))
  })

  it('should call onDismiss when backdrop is pressed', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)
    const mockOnDismiss = jest.fn()

    const {getByTestId} = render(
      <ResponseModal
        visible={true}
        title='Modal Title'
        text='Modal text'
        imageSource={require('@assets/images/successfully_icon.png')}
        onDismiss={mockOnDismiss}
      />,
    )

    const modal = getByTestId('react-native-modal-mock')
    act(() => {
      fireEvent(modal, 'onBackdropPress')
    })

    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })

  it('should not error and modal still display when backdrop is pressed and onDismiss not provided', async () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    const {getByTestId, queryByText} = render(
      <ResponseModal
        visible={true}
        title='Modal Title'
        text='Modal text'
        imageSource={require('@assets/images/successfully_icon.png')}
      />,
    )

    const modal = getByTestId('react-native-modal-mock')
    await act(async () => {
      fireEvent(modal, 'onBackdropPress')
    })

    expect(queryByText('Modal Title')).toBeTruthy()
    expect(queryByText('Modal text')).toBeTruthy()
  })
})
