import {Alert, Linking, PermissionsAndroid} from 'react-native'

import {getAndroidVersion, getPlatFormOS} from '@utils/Helpers'

function getReadImagePermission() {
  if (getAndroidVersion() >= 33) {
    return PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
  } else {
    return PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  }
}

export async function requestStoragePermission() {
  if (getPlatFormOS() === 'android') {
    const requestPermission = getReadImagePermission()
    const permissionStatus = await PermissionsAndroid.request(requestPermission)
    if (permissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      alertRequestPermission(
        'App needs access to your gallery',
        'Please allow permission on settings',
      )
    }
    return permissionStatus === PermissionsAndroid.RESULTS.GRANTED
  } else {
    return true
  }
}

export async function requestCameraPermission() {
  if (getPlatFormOS() === 'android') {
    const permissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    )
    if (permissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      alertRequestPermission(
        'App needs access to your camera',
        'Please allow permission on settings',
      )
    }
    return permissionStatus === PermissionsAndroid.RESULTS.GRANTED
  } else {
    return true
  }
}

export function alertRequestPermission(title: string, message: string) {
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
        onPress: () => Linking.openSettings(),
      },
    ],
    {cancelable: true},
  )
}

export function alertFileSizeExceedHandler(fileSize: number, maxSize: number) {
  if (fileSize > maxSize) {
    Alert.alert('Image size is above the file size limit')
    return
  }
}
