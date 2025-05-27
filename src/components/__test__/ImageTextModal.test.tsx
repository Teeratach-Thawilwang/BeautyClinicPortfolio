import React from 'react'
import {Image} from 'react-native'

import ImageTextModal from '@components/ImageTextModal'
import {act, fireEvent, render, waitFor} from '@utils/TestUtil'

jest.unmock('react-native-modal')

describe('ImageTextModal', () => {
  it('should render modal when visible is true', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    const {getByText} = render(
      <ImageTextModal
        visible={true}
        onDismiss={jest.fn()}
        title='Modal Title'
        text='Modal Text'
        imageSource={require('@assets/successfully_icon.png')}
      />,
    )

    expect(getByText('Modal Title')).toBeTruthy()
    expect(getByText('Modal Text')).toBeTruthy()
    expect(Image).toHaveBeenCalledTimes(1)
  })

  it('should not render modal when visible is false', () => {
    const {queryByTestId} = render(
      <ImageTextModal
        visible={false}
        onDismiss={jest.fn()}
        title='Modal Title'
        text='Modal Text'
        imageSource={require('@assets/successfully_icon.png')}
      />,
    )

    expect(queryByTestId('ImageTextModal')).toBeNull()
  })

  it('should call onDismiss when backdrop is pressed', async () => {
    const mockOnDismiss = jest.fn()
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    const {getByTestId} = render(
      <ImageTextModal
        visible={true}
        onDismiss={mockOnDismiss}
        title='Modal Title'
        text='Modal Text'
        imageSource={require('@assets/successfully_icon.png')}
      />,
    )

    expect(Image).toHaveBeenCalledTimes(1)

    const modal = getByTestId('react-native-modal')
    act(() => {
      fireEvent(modal, 'onBackdropPress')
    })

    await waitFor(() => {
      expect(mockOnDismiss).toHaveBeenCalledTimes(1)
    })
  })
})
