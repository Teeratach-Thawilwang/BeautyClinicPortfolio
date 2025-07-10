import React, {useRef, useState} from 'react'
import {Alert, Text, View} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import Animated, {useAnimatedRef} from 'react-native-reanimated'
import Sortable, {SortableFlexDragEndParams} from 'react-native-sortables'

import {useTheme} from '@context-providers/ThemeProvider'
import {
  requestCameraPermission,
  requestReadImagePermission,
} from '@utils/Permissions'

import ButtonItem from './Components/ButtonItem'
import ImageItem from './Components/ImageItem'
import {getStyles} from './styles'
import {Props, SortableItem} from './types'

export default function ImagePicker({
  onChange,
  initialUris = [],
  maxPhoto = 5,
  maxSize = 10 * 10 ** 6,
  title,
  note,
  saveToPhotos = true,
  gap = 10,
  containerStyle,
  titleStyle,
  noteStyle,
  removeIconStyle,
  imageStyle,
  buttonStyle,
  buttonIconStyle,
  buttonTextStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const keyRef = useRef(initialUris.length)
  const warningFileExceedMessage = 'Image size is above the file size limit'
  const buttonItems: SortableItem[] = [
    {itemType: 'add', uri: '', type: '', key: 'add'},
    {itemType: 'camera', uri: '', type: '', key: 'camera'},
  ]
  const transfromImages: SortableItem[] = initialUris.map((item, index) => ({
    itemType: 'image',
    uri: item.uri,
    type: item.type,
    key: index.toString(),
  }))
  const initialSortItems: SortableItem[] = [...transfromImages, ...buttonItems]
  const [sortItems, setSortItems] = useState<SortableItem[]>(initialSortItems)
  const [triggerReOrder, setTriggerReOrder] = useState(false)
  const scrollableRef = useAnimatedRef<Animated.ScrollView>()
  const sortableFlexKey = `${keyRef.current} - ${sortItems.map(i => i.key).join(' - ')} - ${triggerReOrder}`

  function appendImage(uri: string | undefined, type: string | undefined) {
    if (uri && type) {
      keyRef.current += 1
      const images = sortItems.filter(item => item.itemType === 'image')
      const newItem: SortableItem = {
        itemType: 'image',
        uri: uri,
        type: type,
        key: keyRef.current.toString(),
      }
      const newImages = [...images, newItem]
      const newSortItems =
        newImages.length >= maxPhoto
          ? newImages
          : [...newImages, ...buttonItems]

      setSortItems(newSortItems)
      const onChangeImages = newImages.map(item => ({
        uri: item.uri,
        type: item.type,
      }))
      onChange(onChangeImages)
    }
  }

  function removeImageHandler(key: string) {
    const images = sortItems.filter(
      item => item.itemType === 'image' && item.key !== key,
    )
    const newSortItems =
      images.length >= maxPhoto ? images : [...images, ...buttonItems]
    setSortItems(newSortItems)
    onChange(images)
  }

  function onDragEnd(items: SortableFlexDragEndParams) {
    const newSortItems = items.order(sortItems)
    const isOrderChanged = isOrderKeyChanged(sortItems, newSortItems)
    if (!isOrderChanged) return

    const length = newSortItems.length
    const isAbleToSwap =
      newSortItems[length - 2].itemType === 'add' &&
      newSortItems[length - 1].itemType === 'camera'

    if (isAbleToSwap) {
      setSortItems(newSortItems)
      const images = newSortItems
        .filter(item => item.itemType === 'image')
        .map(item => ({
          uri: item.uri,
          type: item.type,
        }))
      onChange(images)
    } else {
      setTriggerReOrder(val => !val)
      setSortItems(sortItems)
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
      <Animated.ScrollView ref={scrollableRef}>
        <Sortable.Flex
          key={sortableFlexKey}
          gap={gap}
          scrollableRef={scrollableRef}
          dragActivationDelay={150}
          autoScrollActivationOffset={200}
          autoScrollSpeed={1}
          autoScrollEnabled={true}
          onDragEnd={onDragEnd}>
          {sortItems.map((item, index) => {
            if (item.itemType === 'image') {
              return (
                <ImageItem
                  key={index}
                  uri={item.uri}
                  imageStyle={imageStyle}
                  removeIconStyle={removeIconStyle}
                  onRemove={() => removeImageHandler(item.key)}
                />
              )
            }
            return (
              <ButtonItem
                key={index}
                title={item.itemType === 'add' ? 'Image' : 'Camera'}
                icon={item.itemType === 'add' ? 'mat-add-box' : 'camera'}
                onPress={
                  item.itemType === 'add'
                    ? pickupImageHandler
                    : takerPhotoHandler
                }
                containerStyle={buttonStyle}
                titleStyle={buttonTextStyle}
                iconStyle={buttonIconStyle}
              />
            )
          })}
        </Sortable.Flex>
      </Animated.ScrollView>
    </View>
  )
}

function isOrderKeyChanged(
  oldItems: SortableItem[],
  newItems: SortableItem[],
): boolean {
  if (oldItems.length !== newItems.length) return true
  for (let i = 0; i < oldItems.length; i++) {
    if (oldItems[i].key !== newItems[i].key) return true
  }
  return false
}
