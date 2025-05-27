import React from 'react'

import InlineTextLink from '@components/InlineTextLink'
import {fireEvent, render} from '@utils/TestUtil'

describe('InlineTextLink', () => {
  it('should render text and link correctly', () => {
    const {getByText} = render(
      <InlineTextLink text='Text' linkText='Link' onPress={jest.fn()} />,
    )

    expect(getByText('Text')).toBeTruthy()
    expect(getByText('Link')).toBeTruthy()
  })

  it('should call onPress when button pressed', () => {
    const mockOnPress = jest.fn()
    const {getByText} = render(
      <InlineTextLink text='Text' linkText='Link' onPress={mockOnPress} />,
    )
    fireEvent.press(getByText('Link'))

    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })
})
