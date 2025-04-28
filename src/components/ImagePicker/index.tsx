import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {Image} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {Icon, IconButton, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {adjustColorBrightness, alertFileSizeExceed} from '@utils/Helpers'
import {
  requestCameraPermission,
  requestReadImagePermission,
} from '@utils/Permissions'

import {getStyles} from './styles'
import {ImageFileAsset, Props} from './types'

export default function ImagePicker({
  onChange,
  initialUris = [],
  maxPhoto = 5,
  maxSize = 4 * 10 ** 6,
  title,
  saveToPhotos = true,
  containerStyle,
  titleStyle,
  noteStyle,
  removeIconStyle,
  imageContainerStyle,
  imageStyle,
  buttonStyle,
  buttonIconStyle,
  buttonTextStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [imageUris, setImageUris] = useState<ImageFileAsset[]>(initialUris)

  const rippleColor = adjustColorBrightness(
    buttonStyle?.backgroundColor ?? styles.button.backgroundColor,
    -12,
  )

  function appendImage(uri: string | undefined, type: string | undefined) {
    if (uri && type) {
      setImageUris(val => [...val, {uri: uri, type: type}])
      onChange([...imageUris, {uri: uri, type: type}])
    }
  }

  async function pickupImageHandler() {
    const permission = await requestReadImagePermission()
    if (!permission) return
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 1,
    })
    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri
      const fileType = result.assets[0].type
      const fileSize = result.assets[0].fileSize ?? 0
      alertFileSizeExceed(fileSize, maxSize)
      appendImage(uri, fileType)
    }
  }

  async function takerPhotoHandler() {
    const permission = await requestCameraPermission()
    if (!permission) return
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: saveToPhotos,
    })
    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri
      const fileType = result.assets[0].type
      const fileSize = result.assets[0].fileSize ?? 0
      alertFileSizeExceed(fileSize, maxSize)
      appendImage(uri, fileType)
    }
  }

  function removeImageHandler(index: number) {
    setImageUris(val => val.filter((_, i) => i !== index))
    onChange(imageUris.filter((_, i) => i !== index))
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? (
        <>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <Text style={[styles.note, noteStyle]}>
            Note: Format SVG, PNG or JPG (Max size 4MB)
          </Text>
        </>
      ) : null}
      <View style={[styles.imageContainer, imageContainerStyle]}>
        {imageUris.map(({uri}, index) => (
          <View key={index} style={[styles.imageBox, imageStyle]}>
            <Image source={{uri}} style={styles.image} />
            <IconButton
              icon='ion-trash-outline'
              iconColor={removeIconStyle?.color ?? styles.removeIcon.color}
              style={styles.removeIcon}
              size={removeIconStyle?.width ?? styles.removeIcon.width}
              onPress={() => removeImageHandler(index)}
            />
          </View>
        ))}
        {imageUris.length < maxPhoto ? (
          <>
            <View style={[styles.buttonContainer, buttonStyle]}>
              <TouchableRipple
                style={{
                  ...styles.button,
                  backgroundColor:
                    buttonStyle?.backgroundColor ??
                    styles.button.backgroundColor,
                }}
                onPress={pickupImageHandler}
                rippleColor={rippleColor}>
                <>
                  <Icon
                    source='mat-add-box'
                    color={buttonIconStyle?.color ?? styles.buttonIcon.color}
                    size={buttonIconStyle?.width ?? styles.buttonIcon.width}
                  />
                  <Text style={[styles.buttonText, buttonTextStyle]}>
                    Image
                  </Text>
                </>
              </TouchableRipple>
            </View>
            <View style={[styles.buttonContainer, buttonStyle]}>
              <TouchableRipple
                style={{
                  ...styles.button,
                  backgroundColor:
                    buttonStyle?.backgroundColor ??
                    styles.button.backgroundColor,
                }}
                onPress={takerPhotoHandler}
                rippleColor={rippleColor}>
                <>
                  <Icon
                    source='camera'
                    color={buttonIconStyle?.color ?? styles.buttonIcon.color}
                    size={buttonIconStyle?.width ?? styles.buttonIcon.width}
                  />
                  <Text style={[styles.buttonText, buttonTextStyle]}>
                    Camera
                  </Text>
                </>
              </TouchableRipple>
            </View>
          </>
        ) : null}
      </View>
    </View>
  )
}
