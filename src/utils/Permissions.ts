import {Alert} from 'react-native'
import {
  PERMISSIONS,
  Permission,
  PermissionStatus,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions'

import {getAndroidVersion, getPlatFormOS} from '@utils/Helpers'

export async function requestCameraPermission() {
  const permission =
    getPlatFormOS() === 'ios'
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA

  const status = await check(permission)

  return requestPermissionHandler(
    status,
    permission,
    'App needs access to your camera',
    'Please allow permission on settings',
  )
}

export async function requestReadImagePermission() {
  if (getPlatFormOS() !== 'android') return true

  const permission = getReadImagePermission()
  const status = await check(permission)

  return requestPermissionHandler(
    status,
    permission,
    'App needs access to your gallery',
    'Please allow permission on settings',
  )
}

async function requestPermissionHandler(
  status: PermissionStatus,
  permission: Permission,
  alertTitle: string,
  alertMessage: string,
) {
  switch (status) {
    case RESULTS.GRANTED:
      return true
    case RESULTS.DENIED:
      const newStatus = await request(permission)
      return requestPermissionHandler(
        newStatus,
        permission,
        alertTitle,
        alertMessage,
      )
    case RESULTS.BLOCKED:
    default:
      alertRequirePermission(alertTitle, alertMessage)
      return false
  }
}

function getReadImagePermission() {
  if (getAndroidVersion() >= 33) {
    return PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
  } else {
    return PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  }
}

export async function alertRequirePermission(title: string, message: string) {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        onPress: () => openSettings(),
      },
    ],
    {cancelable: true},
  )
}
