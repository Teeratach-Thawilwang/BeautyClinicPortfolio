import {useSignInForm} from '@hooks/SignInHooks'
import {act, renderHook} from '@utils/TestUtil'

describe('useSignInForm', () => {
  it('should initialize form correctly', () => {
    const {result} = renderHook(() => useSignInForm())

    expect(result.current.errors).toEqual({})
    expect(typeof result.current.handleSubmit).toBe('function')
  })

  it('should error when email invalid format', async () => {
    const {result} = renderHook(() =>
      useSignInForm('invalid-email', 'valid password'),
    )

    await act(async () => {
      result.current.handleSubmit(() => {})()
    })

    expect(result.current.errors.email?.message).toBe('Invalid email address')
  })

  it('should error when password invalid format', async () => {
    const {result} = renderHook(() => useSignInForm('test@email.com', '123'))

    await act(async () => {
      result.current.handleSubmit(() => {})()
    })

    expect(result.current.errors.password?.message).toBe(
      'Password must be at least 6 characters long',
    )
  })
})
