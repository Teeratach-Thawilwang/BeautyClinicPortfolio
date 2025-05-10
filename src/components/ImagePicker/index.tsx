import React, {useState} from 'react'
import {Alert, Text, View} from 'react-native'
import {Image} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {Icon, IconButton, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {adjustColorBrightness} from '@utils/Helpers'
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
  maxSize = 10 * 10 ** 6,
  title,
  note,
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
  const [images, setImages] = useState<ImageFileAsset[]>(initialUris)
  const warningFileExceedMessage = 'Image size is above the file size limit'

  const rippleColor = adjustColorBrightness(
    buttonStyle?.backgroundColor ?? styles.button.backgroundColor,
    -12,
  )

  function appendImage(uri: string | undefined, type: string | undefined) {
    if (uri && type) {
      setImages(val => [...val, {uri: uri, type: type}])
      onChange([...images, {uri: uri, type: type}])
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
      if (fileSize > maxSize) {
        Alert.alert(warningFileExceedMessage)
        return
      }
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
      if (fileSize > maxSize) {
        Alert.alert(warningFileExceedMessage)
        return
      }
      appendImage(uri, fileType)
    }
  }

  function removeImageHandler(index: number) {
    setImages(val => val.filter((_, i) => i !== index))
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? (
        <>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <Text style={[styles.note, noteStyle]}>
            {note ?? 'Note: Format SVG, PNG or JPG (Max size 10MB)'}
          </Text>
        </>
      ) : null}

      <View style={[styles.imageContainer, imageContainerStyle]}>
        {images.map((image, index) => (
          <View key={index} style={[styles.imageBox, imageStyle]}>
            <Image source={{uri: image.uri}} style={styles.image} />
            <IconButton
              icon='ion-trash-outline'
              iconColor={removeIconStyle?.color ?? styles.removeIcon.color}
              style={styles.removeIcon}
              size={removeIconStyle?.width ?? styles.removeIcon.width}
              onPress={() => removeImageHandler(index)}
            />
          </View>
        ))}

        {images.length < maxPhoto ? (
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
