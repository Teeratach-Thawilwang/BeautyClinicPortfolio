import useResetPasswordForm from '@hooks/useResetPasswordForm'
import {act, renderHook} from '@utils/TestUtil'

describe('useResetPasswordForm', () => {
  it('should initialize form correctly', () => {
    const {result} = renderHook(() => useResetPasswordForm('test@email.com'))

    expect(result.current.errors).toEqual({})
    expect(typeof result.current.handleSubmit).toBe('function')
  })

  it('should error when email invalid format', async () => {
    const {result} = renderHook(() =>
      useResetPasswordForm('invalid-email', 'valid password', 'valid password'),
    )

    await act(async () => {
      result.current.handleSubmit(() => {})()
    })

    expect(result.current.errors.email?.message).toBe('Invalid email address')
  })

  it('should error when password invalid format', async () => {
    const {result} = renderHook(() =>
      useResetPasswordForm('test@email.com', '123', '123'),
    )

    await act(async () => {
      result.current.handleSubmit(() => {})()
    })

    expect(result.current.errors.password?.message).toBe(
      'Password must be at least 6 characters long',
    )
  })

  it('should error when password and confirm-password is not equal', async () => {
    const {result} = renderHook(() =>
      useResetPasswordForm(
        'test@email.com',
        'valid password 1',
        'valid password 2',
      ),
    )
    await act(async () => {
      result.current.handleSubmit(() => {})()
    })

    expect(result.current.errors.confirmPassword?.message).toBe(
      'Passwords do not match',
    )
  })
})
