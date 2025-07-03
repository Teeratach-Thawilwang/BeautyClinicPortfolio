import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {shallowEqual} from 'react-redux'

import {AuthSlice} from '@models/AuthTypes'
import supabase from '@services/SupabaseClient'
import {store, useAppSelector} from '@store/Store'
import {update} from '@store/slices/AuthSlice'
import {getFCMToken} from '@utils/FirebaseMessage'

class AuthService {
  public update(data: Partial<AuthSlice>) {
    store.dispatch(update(data))
  }

  public getState() {
    return useAppSelector(state => state.auth, shallowEqual)
  }

  public getUser() {
    return useAppSelector(state => state.auth.user, shallowEqual)
  }

  public getIsAdmin() {
    return useAppSelector(state => state.auth.isAdmin, shallowEqual)
  }

  public getIsSignIn() {
    return useAppSelector(state => state.auth.user != null, shallowEqual)
  }

  public async fetchIsAdmin(userId: string) {
    const {data, error} = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', userId)
      .limit(1)

    if (error) {
      return error
    }

    if (data.length != 0) {
      this.update({isAdmin: true})
      return true
    }

    this.update({isAdmin: false})
    return false
  }

  public async signUpWithEmail(email: string, password: string, name: string) {
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: process.env.SUPABASE_CONFIRM_SIGNUP_REDIRECT_URL,
        data: {
          name: name,
        },
      },
    })

    if (error) {
      this.update({user: null})
      throw error
    }
    this.update({user: data.session?.user ?? null})
    return data
  }

  public async signInWithEmail(email: string, password: string) {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      this.update({user: null})
      if (error?.code == 'email_not_confirmed') {
        await this.resendConfirmSignup(email)
        return null
      }
      throw error
    }
    this.update({user: data.session.user})
    return data
  }

  public async signInOnGoogle() {
    const hasService = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    })
    if (!hasService) {
      return null
    }
    return await GoogleSignin.signIn()
  }

  public async signInWithGoogle(): Promise<{
    success: boolean
    error: string | null
  }> {
    const response = await this.signInOnGoogle()
    if (response == null || response.type === 'cancelled') {
      return {success: false, error: null}
    }
    const idToken = response.data.idToken as string
    const {data, error} = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    })

    if (error) {
      this.update({user: null})
      return {success: false, error: error.message}
    }

    this.update({user: data.session.user})
    return {success: true, error: null}
  }

  public async signOut() {
    await this.deleteFcmToken()

    const {error} = await supabase.auth.signOut()
    if (error) {
      return error
    }
    const isGoogleSigningin = GoogleSignin.getCurrentUser()
    if (isGoogleSigningin) await GoogleSignin.signOut()

    this.update({user: null, isAdmin: false})
    return null
  }

  public async forgotPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.SUPABASE_FORGOT_PASSWORD_REDIRECT_URL,
    })
  }

  public async verifyRecoveryToken(tokenHash: string) {
    const {data, error} = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: 'recovery',
    })
    if (error) {
      throw error
    }
    return data.session?.user
  }

  public async updatePassword(email: string, password: string) {
    const {data, error} = await supabase.auth.updateUser({
      email: email,
      password: password,
    })
    if (error) {
      throw error
    }
    this.update({user: data.user})
    return data
  }

  public async verifyConfirmSingupToken(tokenHash: string) {
    const {data, error} = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: 'signup',
    })

    if (error) {
      throw error
    }

    const user = data.session?.user ?? null
    this.update({user: user})
    return data
  }

  public async resendConfirmSignup(email: string) {
    const {error} = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: process.env.SUPABASE_CONFIRM_SIGNUP_REDIRECT_URL,
      },
    })
    if (error) {
      throw error
    }
    return null
  }

  public async upsertFcmToken(userId: string) {
    const fcmToken = await getFCMToken()
    const {error} = await supabase
      .from('user_fcm_tokens')
      .upsert(
        {user_id: userId, token: fcmToken, updated_at: new Date()},
        {onConflict: 'token'},
      )
    return error == null
  }

  public async deleteFcmToken() {
    const fcmToken = await getFCMToken()
    const {error} = await supabase
      .from('user_fcm_tokens')
      .delete()
      .eq('token', fcmToken)
    return error == null
  }
}

export default new AuthService()
