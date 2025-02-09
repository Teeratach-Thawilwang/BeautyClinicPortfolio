import {GoogleSignin} from '@react-native-google-signin/google-signin'

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: false,
  })
}

export async function signinOnGoogle() {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true})
  return await GoogleSignin.signIn()
}
