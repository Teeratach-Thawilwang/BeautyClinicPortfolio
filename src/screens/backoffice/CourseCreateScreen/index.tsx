import React, {useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import CourseForm from '@components/Backoffice/CourseForm'
import {ImageFileAsset} from '@components/ImagePicker/types'
import {useTheme} from '@context-providers/ThemeProvider'
import {useFocusEffect, useRefresh} from '@hooks/CommonHooks'
import {useQueryAllActiveCategories} from '@hooks/backoffice/CategoryHooks'
import {
  CourseFormData,
  useCourseCreateMutation,
} from '@hooks/backoffice/CourseHooks'
import {CourseCreateProps} from '@models/backoffice/CourseTypes'
import FileService from '@services/FileService'

import {getStyles} from './styles'

export default function CourseCreateScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [isFirstTime, setIsFirstTime] = useState(true)

  const {
    data: categories,
    isFetching: isCategoryLoading,
    refetch: refetchCategory,
  } = useQueryAllActiveCategories()

  const {mutateAsync} = useCourseCreateMutation()

  const isShowSkeleton = isFirstTime || isCategoryLoading

  const {refreshing, onRefresh} = useRefresh(() => {
    refetchCategory()
  })

  useFocusEffect(() => {
    const timeout = setTimeout(() => {
      setIsFirstTime(false)
    }, 200)
    return () => {
      clearTimeout(timeout)
      setIsFirstTime(true)
    }
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {isShowSkeleton ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <CourseForm
          onSubmit={async (formData: CourseFormData) => {
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
            await mutateAsync(transformData as CourseCreateProps)
          }}
          categories={categories ?? []}
        />
      )}
    </ScrollView>
  )
}
