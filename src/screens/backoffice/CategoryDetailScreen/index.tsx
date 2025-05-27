import React from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import CategoryForm from '@components/Backoffice/CategoryForm'
import {ImageFileAsset} from '@components/ImagePicker/types'
import {useTheme} from '@context-providers/ThemeProvider'
import {useRefresh} from '@hooks/CommonHooks'
import {
  CategoryFormData,
  useCategoryDeleteMutation,
  useCategoryUpdateMutation,
  useQueryCategoryById,
} from '@hooks/backoffice/CategoryHooks'
import {CategoryUpdateProps} from '@models/CategoryTypes'
import {CategoryDetailRouteProp} from '@navigation/backoffice/BackOfficeNavigator'
import FileService from '@services/FileService'

import {getStyles} from './styles'

export default function CategoryDetailScreen({
  route,
}: {
  route: CategoryDetailRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  const {
    data: category,
    isFetching: isLoading,
    refetch: refetch,
  } = useQueryCategoryById(route.params.categoryId)

  const {mutate: updateMutate} = useCategoryUpdateMutation()
  const {mutate: deleteMutate} = useCategoryDeleteMutation()

  const {refreshing, onRefresh} = useRefresh(() => {
    refetch()
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
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <CategoryForm
          key={route.params.categoryId}
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
            const transformData = {...formData, images: transformImage}
            updateMutate(transformData as CategoryUpdateProps)
          }}
          onDelete={async () => {
            if (category) deleteMutate(category.id)
          }}
          category={category}
        />
      )}
    </ScrollView>
  )
}
