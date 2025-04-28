import React from 'react'
import {Image} from 'react-native'

import LogoHeader from '@components/LogoHeader'
import {fireEvent, render} from '@utils/TestUtil'

describe('LogoHeader', () => {
  it('should render the logo and text correctly', () => {
    jest.spyOn(require('react-native'), 'Image').mockImplementation(() => null)

    const {getByText} = render(<LogoHeader />)

    expect(getByText('Beauty')).toBeTruthy()
    expect(getByText('Clinic')).toBeTruthy()
    expect(Image).toHaveBeenCalledTimes(1)
  })

  it('should render back button when allowBack is true', () => {
    const {getByRole} = render(<LogoHeader />)

    const backButton = getByRole('button')
    expect(backButton).toBeTruthy()
  })

  it('should not render back button when allowBack is false', () => {
    const {queryByRole} = render(<LogoHeader allowBack={false} />)

    const backButton = queryByRole('button')
    expect(backButton).toBeNull()
  })

  it('should call goBack on back button press', () => {
    const goBackMock = jest.fn()
    jest.spyOn(require('@hooks/CommonHooks'), 'useNavigate').mockReturnValue({
      goBack: goBackMock,
    })

    const {getByRole} = render(<LogoHeader />)

    const backButton = getByRole('button')

    fireEvent.press(backButton)
    expect(goBackMock).toHaveBeenCalledTimes(1)
  })
})
