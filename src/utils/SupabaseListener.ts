import NetInfo from '@react-native-community/netinfo'
import {AppState} from 'react-native'

import AdminService from '@services/AdminService'
import AuthenticationService from '@services/AuthenticationService'
import supabase from '@services/SupabaseClient'

export function appStateAuthRefreshListener() {
  const listener = AppState.addEventListener('change', async state => {
    const netInfo = await NetInfo.fetch()
    if (state === 'active' && netInfo.isInternetReachable) {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
  return () => listener.remove()
}

export function netInfoListener() {
  return NetInfo.addEventListener(async state => {
    if (state.isInternetReachable && AppState.currentState === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
}

export function authListenerHandler() {
  const listener = supabase.auth.onAuthStateChange((event, session) => {
    setTimeout(async () => {
      if (
        (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') &&
        session?.user
      ) {
        await AuthenticationService.upsertFcmToken(session.user.id)
        await AdminService.fetchIsAdmin(session.user.id)
      }

      if (event === 'SIGNED_OUT') {
        AdminService.update({isAdmin: false})
      }
    }, 0)
  })
  return () => listener.data.subscription.unsubscribe()
}

export function supabaseListeners() {
  const authRefreshUnsubscribe = appStateAuthRefreshListener()
  const authListenerUnsubscribe = authListenerHandler()
  const netInfoUnsubscribe = netInfoListener()

  return () => {
    authRefreshUnsubscribe()
    authListenerUnsubscribe()
    netInfoUnsubscribe()
  }
}
