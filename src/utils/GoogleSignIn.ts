import {GoogleSignin} from '@react-native-google-signin/google-signin'

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: false,
  })
}
