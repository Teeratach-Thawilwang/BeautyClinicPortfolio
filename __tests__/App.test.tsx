/**
 * @format
 */
// Note: import explicitly to use the types shipped with jest.
import {render} from '@testing-library/react-native'
import React from 'react'
import 'react-native'

import App from '../App'

describe('ทดสอบ App', () => {
  it.skip('App สามารถ render ได้ถูกต้อง', () => {
    render(<App />)
  })
})
