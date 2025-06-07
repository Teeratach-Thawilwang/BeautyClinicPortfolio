import React from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import CourseForm from '@components/Backoffice/CourseForm'
import {ImageFileAsset} from '@components/ImagePicker/types'
import {useTheme} from '@context-providers/ThemeProvider'
import {useRefresh} from '@hooks/CommonHooks'
import {useQueryAllActiveCategories} from '@hooks/backoffice/CategoryHooks'
import {
  CourseFormData,
  useCourseDeleteMutation,
  useCourseUpdateMutation,
  useQueryCourseById,
} from '@hooks/backoffice/CourseHooks'
import {CourseUpdateProps} from '@models/CourseTypes'
import {CourseDetailRouteProp} from '@navigation/backoffice/BackOfficeNavigator'
import FileService from '@services/FileService'

import {getStyles} from './styles'

export default function CourseDetailScreen({
  route,
}: {
  route: CourseDetailRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {
    data: course,
    isFetching: isCourseLoading,
    refetch: refetchCourse,
  } = useQueryCourseById(route.params.courseId)

  const {
    data: categories,
    isFetching: isCategoryLoading,
    refetch: refetchCategory,
  } = useQueryAllActiveCategories()

  const {mutateAsync: updateMutate} = useCourseUpdateMutation()
  const {mutateAsync: deleteMutate} = useCourseDeleteMutation()

  const isShowSkeleton = isCourseLoading || isCategoryLoading

  const {refreshing, onRefresh} = useRefresh(() => {
    refetchCourse()
    refetchCategory()
  })

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
          key={route.params.courseId}
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
            const transformData = {...formData, images: transformImage}
            await updateMutate(transformData as CourseUpdateProps)
          }}
          onDelete={async () => {
            if (course) await deleteMutate(course.id)
          }}
          categories={categories ?? []}
          course={course}
        />
      )}
    </ScrollView>
  )
}
