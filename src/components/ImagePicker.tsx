import React, {useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Image} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {Icon, IconButton, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {ImageFileAsset} from '@models/ImagePickerTypes'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'
import {adjustColorBrightness, alertFileSizeExceed} from '@utils/Helpers'
import {
  requestCameraPermission,
  requestReadImagePermission,
} from '@utils/Permissions'

export default function ImageMultiPicker({
  onChange,
  initialUris = [],
  maxPhoto = 5,
  maxSize = 4 * 10 ** 6,
  title = 'Images',
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
}: {
  onChange: (fileAssets: ImageFileAsset[]) => void
  initialUris?: ImageFileAsset[]
  maxPhoto?: number
  maxSize?: number
  title?: string
  saveToPhotos?: boolean
  containerStyle?: any
  titleStyle?: any
  noteStyle?: any
  removeIconStyle?: {width: number; color: string}
  imageContainerStyle?: any
  imageStyle?: any
  buttonStyle?: any
  buttonIconStyle?: {width: number; color: string}
  buttonTextStyle?: any
}) {
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
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Text style={[styles.note, noteStyle]}>
        Note: Format SVG, PNG or JPG (Max size 4MB)
      </Text>
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

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      width: '100%',
      gap: 10,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fonts.headlineSmall.fontSize,
    },
    note: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fonts.labelLarge.fontSize,
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: 10,
    },
    imageBox: {
      width: 100,
      height: 100,
      borderRadius: 8,
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    removeIcon: {
      margin: 5,
      width: 22,
      height: 22,
      color: theme.colors.onSurface,

      position: 'absolute',
      top: 0,
      right: 0,
    },
    buttonContainer: {
      width: 100,
      height: 100,
      borderRadius: 8,
      overflow: 'hidden',
    },
    button: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.primary,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: theme.fonts.titleSmall.fontSize,
      fontWeight: '500',
      color: theme.colors.onPrimary,
    },
    buttonIcon: {
      width: 50,
      color: theme.colors.onPrimary,
    },
  })
}
