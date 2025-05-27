import {NavigationContext} from '@react-navigation/native'
import {BackHandler} from 'react-native'

import {
  disableBackSwipe,
  googleSignInHandler,
  useEffectScreen,
  useNavigate,
} from '@hooks/CommonHooks'
import AuthenticationService from '@services/AuthenticationService'
import {act, render, renderHook} from '@utils/TestUtil'

jest.mock('@hooks/CommonHooks', () => {
  return {
    ...jest.requireActual('@hooks/CommonHooks'),
  }
})

describe('CommonHook', () => {
  it('useEffectScreen should call handler on focus and call cleanup on blur', async () => {
    const handler = jest.fn()
    const cleanup = jest.fn()

    const actualNav = jest.requireActual('@react-navigation/native')
    const navContext = {
      ...actualNav.navigation,
      isFocused: () => true,
      addListener: jest.fn(() => jest.fn()),
    }

    const Component = () => {
      useEffectScreen(() => {
        handler()
        return () => cleanup()
      }, [])
      return null
    }

    const {rerender} = render(
      <NavigationContext.Provider value={navContext}>
        <Component />
      </NavigationContext.Provider>,
    )
    expect(handler).toHaveBeenCalledTimes(1)

    act(() => {
      rerender(
        <NavigationContext.Provider
          value={{...navContext, isFocused: () => false}}>
          <Component />
        </NavigationContext.Provider>,
      )
    })
    expect(cleanup).toHaveBeenCalledTimes(1)

    act(() => {
      rerender(
        <NavigationContext.Provider
          value={{...navContext, isFocused: () => true}}>
          <Component />
        </NavigationContext.Provider>,
      )
    })
    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('disableBackSwipe should register and unregister back press handler', () => {
    const handler = jest.fn().mockReturnValue(true)
    const removeHandler = jest.fn()
    const addEventListenerSpy = jest
      .spyOn(BackHandler, 'addEventListener')
      .mockReturnValue({remove: removeHandler})

    const {unmount} = renderHook(() => disableBackSwipe(handler))
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'hardwareBackPress',
      handler,
    )
    expect(removeHandler).toHaveBeenCalledTimes(0)

    unmount()
    expect(removeHandler).toHaveBeenCalled()
  })

  it('should navigate to HomeScreen if Google sign-in is successful', async () => {
    jest
      .spyOn(AuthenticationService, 'signinWithGoogle')
      .mockResolvedValue({success: true, data: null, error: null})
    const mockNavigate = jest.fn()
    jest
      .spyOn(require('@hooks/CommonHooks'), 'useNavigate')
      .mockReturnValue({navigate: mockNavigate})

    await act(async () => {
      const navigation = useNavigate()
      await googleSignInHandler(navigation)
    })

    expect(mockNavigate).toHaveBeenCalledWith('BottomTabScreens', {
      screen: 'Home',
    })
  })

  it('should not navigate if Google sign-in fails', async () => {
    jest
      .spyOn(AuthenticationService, 'signinWithGoogle')
      .mockResolvedValue({success: false, data: null, error: null})
    const mockNavigate = jest.fn()
    jest
      .spyOn(require('@hooks/CommonHooks'), 'useNavigate')
      .mockReturnValue({navigate: mockNavigate})

    await act(async () => {
      const navigation = useNavigate()
      await googleSignInHandler(navigation)
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should return the navigation object', () => {
    const mockNavigate = jest.fn()
    jest
      .spyOn(require('@hooks/CommonHooks'), 'useNavigate')
      .mockReturnValue({navigate: mockNavigate})

    const {result} = renderHook(() => useNavigate())
    expect(result.current.navigate).toBe(mockNavigate)
  })
})
