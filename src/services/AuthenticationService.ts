import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {User} from '@supabase/supabase-js'
import {shallowEqual} from 'react-redux'

import {UserSliceInterface} from '@models/UserInterface'
import {signInOnGoogle} from '@repositories/GoogleSignIn'
import supabase from '@repositories/supabase/SupabaseClient'
import {store, useAppSelector} from '@store/Store'
import {update} from '@store/slices/UserSlice'
import {getFCMToken} from '@utils/FirebaseMessage'

type Response = {
  success: boolean | null
  data: User | null
  error: string | null
}

class AuthenticationService {
  public update(data: Partial<UserSliceInterface>) {
    store.dispatch(update(data))
  }

  public getUser() {
    return useAppSelector(state => state.user.data, shallowEqual)
  }

  public getIsSignIn() {
    return useAppSelector(state => state.user.data != null, shallowEqual)
  }

  public getIsLoading() {
    return useAppSelector(state => state.user.isLoading, shallowEqual)
  }

  public getError() {
    return useAppSelector(state => state.user.error, shallowEqual)
  }

  public async fetchUser(): Promise<Response> {
    this.update({isLoading: true})
    const {data, error} = await supabase.auth.getSession()

    if (error) {
      this.update({data: null, isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }

    const user = data.session?.user ?? null
    this.update({data: user, isLoading: false, error: null})
    return {success: true, data: user, error: null}
  }

  public async signupWithEmail(email: string, password: string): Promise<Response> {
    this.update({isLoading: true})
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: process.env.SUPABASE_CONFIRM_SIGNUP_REDIRECT_URL,
      },
    })

    if (error) {
      this.update({data: null, isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }

    const user = data.session?.user ?? null
    this.update({data: user, isLoading: false, error: null})
    return {success: true, data: user, error: null}
  }

  public async signinWithEmail(email: string, password: string): Promise<Response> {
    this.update({isLoading: true})
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error?.code == 'email_not_confirmed') {
        await this.resendConfirmSignup(email)
      }

      this.update({data: null, isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }
    if (!data.session) {
      this.update({data: null, isLoading: false, error: null})
      return {success: false, data: null, error: null}
    }

    this.update({data: data.session.user, isLoading: false, error: null})
    return {success: true, data: data.session.user, error: null}
  }

  public async signinWithGoogle(): Promise<Response> {
    this.update({isLoading: true})
    const response = await signInOnGoogle()
    if (response.type === 'cancelled') {
      this.update({data: null, isLoading: false, error: null})
      return {success: null, data: null, error: null}
    }
    const idToken = response.data.idToken as string
    const {data, error} = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    })

    if (error) {
      this.update({data: null, isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }

    const user = data.session.user
    this.update({data: user, isLoading: false, error: null})
    return {success: true, data: user, error: null}
  }

  public async signOut(): Promise<Response> {
    this.update({isLoading: true})
    await this.deleteFcmToken()

    const {error} = await supabase.auth.signOut()
    if (error) {
      this.update({isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }
    const isGoogleSigningin = GoogleSignin.getCurrentUser()
    if (isGoogleSigningin) await GoogleSignin.signOut()

    this.update({data: null, isLoading: false, error: null})
    return {success: true, data: null, error: null}
  }

  public async forgotPassword(email: string): Promise<Response> {
    this.update({isLoading: true})
    const {error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.SUPABASE_FORGOT_PASSWORD_REDIRECT_URL,
    })

    if (error) {
      this.update({isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }
    this.update({isLoading: false, error: null})
    return {success: true, data: null, error: null}
  }

  public async verifyRecoveryToken(tokenHash: string): Promise<Response> {
    this.update({isLoading: true})
    const {data, error} = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: 'recovery',
    })

    if (error) {
      this.update({isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }

    const user = data.session?.user ?? null
    this.update({data: user, isLoading: false, error: null})
    return {success: true, data: user, error: null}
  }

  public async updatePassword(email: string, password: string): Promise<Response> {
    this.update({isLoading: true})
    const {data, error} = await supabase.auth.updateUser({
      email: email,
      password: password,
    })

    if (error) {
      this.update({isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }
    this.update({data: data.user, isLoading: false, error: null})
    return {success: true, data: data.user, error: null}
  }

  public async verifyConfirmSingupToken(tokenHash: string): Promise<Response> {
    this.update({isLoading: true})
    const {data, error} = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: 'signup',
    })

    if (error) {
      this.update({isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }

    const user = data.session?.user ?? null
    this.update({data: user, isLoading: false, error: null})
    return {success: true, data: user, error: null}
  }

  public async resendConfirmSignup(email: string): Promise<Response> {
    this.update({isLoading: true})
    const {error} = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: process.env.SUPABASE_CONFIRM_SIGNUP_REDIRECT_URL,
      },
    })

    if (error) {
      this.update({data: null, isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }

    this.update({data: null, isLoading: false, error: null})
    return {success: true, data: null, error: null}
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
    const {error} = await supabase.from('user_fcm_tokens').delete().eq('token', fcmToken)
    return error == null
  }
}

export default new AuthenticationService()
