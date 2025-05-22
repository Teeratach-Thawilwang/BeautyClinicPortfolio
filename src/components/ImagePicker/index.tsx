import React, {useCallback, useRef, useState} from 'react'
import {Alert, Text, View} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import Animated, {useAnimatedRef} from 'react-native-reanimated'
import Sortable, {
  SortableGridDragEndParams,
  SortableGridRenderItem,
} from 'react-native-sortables'

import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'
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
  const scrollableRef = useAnimatedRef<Animated.ScrollView>()
  const {width} = useResponsiveScreen()
  const columns = Math.floor(width / Number(imageStyle?.width ?? 100))

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

  function onDragEnd(items: SortableGridDragEndParams<SortableItem>) {
    const isItemsChange = isOrderKeyChanged(sortItems, items.data)
    if (!isItemsChange) return
    setSortItems(items.data)
    const images = items.data
      .filter(item => item.itemType === 'image')
      .map(item => ({
        uri: item.uri,
        type: item.type,
      }))
    onChange(images)
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

  const renderItem = useCallback<SortableGridRenderItem<SortableItem>>(
    ({item}) => {
      if (item.itemType === 'image') {
        return (
          <Sortable.Handle mode='draggable'>
            <ImageItem
              uri={item.uri}
              imageStyle={imageStyle}
              removeIconStyle={removeIconStyle}
              onRemove={() => removeImageHandler(item.key)}
            />
          </Sortable.Handle>
        )
      }
      return (
        <Sortable.Handle mode='fixed'>
          <ButtonItem
            title={item.itemType === 'add' ? 'Image' : 'Camera'}
            icon={item.itemType === 'add' ? 'mat-add-box' : 'camera'}
            onPress={
              item.itemType === 'add' ? pickupImageHandler : takerPhotoHandler
            }
            containerStyle={buttonStyle}
            titleStyle={buttonTextStyle}
            iconStyle={buttonIconStyle}
          />
        </Sortable.Handle>
      )
    },
    [sortItems],
  )

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
        <Sortable.Grid
          key={`${keyRef.current} - ${sortItems.length}`}
          customHandle={true}
          rowGap={gap}
          columnGap={gap}
          columns={columns}
          data={sortItems}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          scrollableRef={scrollableRef}
          dragActivationDelay={80}
          autoScrollActivationOffset={200}
          autoScrollSpeed={1}
          autoScrollEnabled={true}
          onDragEnd={onDragEnd}
        />
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
