import {User} from '@supabase/supabase-js'
import React from 'react'

import ResetPasswordRender from '@components/Authentication/ResetPasswordRender'
import {render} from '@utils/TestUtil'

jest.mock('@components/Authentication/ResetPasswordForm', () => () => {
  const {Text} = jest.requireActual('react-native-paper')
  return <Text>ResetPasswordForm</Text>
})

jest.mock(
  '@components/Authentication/ResetPasswordError',
  () =>
    ({error}: {error: string}) => {
      const realModule = jest.requireActual('react-native-paper')
      const Text = realModule.Text
      return <Text>{error}</Text>
    },
)

describe('ResetPasswordRender', () => {
  it('should render ActivityIndicator when isFirstRender is true', () => {
    const {getByRole} = render(
      <ResetPasswordRender
        isFirstRender={true}
        user={null}
        error='some error text'
        onSuccess={jest.fn()}
      />,
    )

    expect(getByRole('progressbar')).toBeTruthy()
  })

  it('should render ResetPasswordForm when isFirstRender is false, user is not null', () => {
    const {getByText} = render(
      <ResetPasswordRender
        isFirstRender={false}
        user={{} as User}
        error='some error text'
        onSuccess={jest.fn()}
      />,
    )

    expect(getByText('ResetPasswordForm')).toBeTruthy()
  })

  it('should render ResetPasswordError when isFirstRender is false, user is null and error is not null', () => {
    const {getByText} = render(
      <ResetPasswordRender
        isFirstRender={false}
        user={null}
        error='some error text'
        onSuccess={jest.fn()}
      />,
    )

    expect(getByText('some error text')).toBeTruthy()
  })

  it('should render null on another case', () => {
    const {queryByText} = render(
      <ResetPasswordRender
        isFirstRender={false}
        user={null}
        error={null}
        onSuccess={jest.fn()}
      />,
    )

    expect(queryByText('loading-indicator.')).toBeNull()
    expect(queryByText('ResetPasswordForm')).toBeNull()
    expect(queryByText('some error text')).toBeNull()
  })
})
