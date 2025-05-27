import React from 'react'
import {RefreshControl, ScrollView} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'
import useCourseForm, {useCourseById} from '@hooks/BackofficeCourseHook'
import {useRefresh} from '@hooks/CommonHooks'
import {CourseDetailRouteProp} from '@navigation/backoffice/BackOfficeNavigator'

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
    isFetching: isLoading,
    refetch,
  } = useCourseById(route.params.courseId, 60 * 1000)
  const {refreshing, onRefresh} = useRefresh(() => refetch())
  const {control, handleSubmit, errors} = useCourseForm(course)

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps='handled'
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }></ScrollView>
  )
}
