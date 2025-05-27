import {useForgotPasswordForm} from '@hooks/ForgotPasswordHooks'
import {act, renderHook} from '@utils/TestUtil'

describe('useForgotPasswordForm', () => {
  it('should initialize form correctly', () => {
    const {result} = renderHook(() => useForgotPasswordForm())

    expect(result.current.errors).toEqual({})
    expect(typeof result.current.handleSubmit).toBe('function')
  })

  it('should error when email invalid format', async () => {
    const {result} = renderHook(() => useForgotPasswordForm('invalid-email'))

    await act(async () => {
      result.current.handleSubmit(() => {})()
    })

    expect(result.current.errors.email?.message).toBe('Invalid email address')
  })
})
