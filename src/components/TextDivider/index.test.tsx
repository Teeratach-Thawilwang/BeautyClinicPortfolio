import React from 'react'

import TextDivider from '@components/TextDivider'
import {render} from '@utils/TestUtil'

describe('TextDivider', () => {
  it('should render text correctly', () => {
    const {getByText, getByTestId} = render(<TextDivider>text</TextDivider>)

    expect(getByText('text')).toBeTruthy()
    expect(getByTestId('left-divider')).toBeTruthy()
    expect(getByTestId('right-divider')).toBeTruthy()
  })
})
