import React, {useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import CategoryForm from '@components/Backoffice/CategoryForm'
import {ImageFileAsset} from '@components/ImagePicker/types'
import {useTheme} from '@context-providers/ThemeProvider'
import {useFocusEffect, useRefresh} from '@hooks/CommonHooks'
import {
  CategoryFormData,
  useCategoryCreateMutation,
} from '@hooks/backoffice/CategoryHooks'
import {CategoryCreateProps} from '@models/CategoryTypes'
import FileService from '@services/FileService'

import {getStyles} from './styles'

export default function CategoryCreateScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [refresh, setRefresh] = useState(false)

  const {mutate} = useCategoryCreateMutation()

  const {refreshing, onRefresh} = useRefresh(() => {
    setRefresh(val => !val)
  })

  useFocusEffect(() => {
    const timeout = setTimeout(() => {
      setIsFirstTime(false)
    }, 200)
    return () => {
      clearTimeout(timeout)
      setIsFirstTime(true)
    }
  }, [refresh])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {isFirstTime ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <CategoryForm
          onSubmit={async (formData: CategoryFormData) => {
            const transformImage: ImageFileAsset[] = []
            for (const image of formData.images) {
              let uri: string = image.uri
              if (!uri.startsWith('https:')) {
                uri = await FileService.uploadImage(image)
              }
              transformImage.push({
                uri: uri,
                type: image.type,
              })
            }
            const {id, ...formDataCreate} = {...formData}
            const transformData = {...formDataCreate, images: transformImage}
            mutate(transformData as CategoryCreateProps)
          }}
        />
      )}
    </ScrollView>
  )
}
