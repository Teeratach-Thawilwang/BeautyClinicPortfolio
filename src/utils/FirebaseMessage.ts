import messaging from '@react-native-firebase/messaging'
import {useEffect} from 'react'
import {PermissionsAndroid} from 'react-native'

import {getPlatFormOS} from '@utils/Helpers'

export async function requestNotificationPermission() {
  if (getPlatFormOS() === 'android') {
    return await requestAndroidNotificationPermission()
  }
  return await requestIOSNotificationPermission()
}

export async function requestAndroidNotificationPermission() {
  const permissionStatus = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  )

  return permissionStatus === PermissionsAndroid.RESULTS.GRANTED
}

export async function requestIOSNotificationPermission() {
  const authStatus = await messaging().requestPermission()
  const isEnabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  return isEnabled
}

export async function getFCMToken() {
  return await messaging().getToken()
}

export function subScribeForegroundFirebaseMessage(
  handlers: ((message: any) => void)[],
) {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      handlers.forEach(handler => handler(remoteMessage))
    })

    return unsubscribe
  }, [])
}
