import React from 'react'

import ForgotPasswordScreen from '@screens/store/ForgotPasswordScreen'
import {render} from '@utils/TestUtil'

describe('ForgotPasswordScreen', () => {
  it('should render all components correctly', () => {
    const {getByText} = render(<ForgotPasswordScreen />)

    expect(getByText('Beauty')).toBeTruthy()
    expect(getByText('Clinic')).toBeTruthy()
    expect(getByText('Forgot Password ?')).toBeTruthy()
    expect(
      getByText('Enter your email. We will send you a link to reset password.'),
    ).toBeTruthy()
    expect(getByText('Reset Password')).toBeTruthy()
  })
})
