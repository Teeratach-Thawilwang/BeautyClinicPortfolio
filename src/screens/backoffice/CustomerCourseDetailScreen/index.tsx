import React from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useRefresh} from '@hooks/CommonHooks'
import {
  CustomerCourseFormData,
  useCustomerCourseUpdateMutation,
} from '@hooks/backoffice/CustomerCourseHooks'
import {CustomerCourseUpdateProps} from '@models/CustomerCourseType'
import {CustomerCourseDetailRouteProp} from '@navigation/backoffice/BackOfficeNavigator'

import CustomerCourseForm from './Components/CustomerCourseForm'
import {getStyles} from './styles'

export default function CustomerCourseDetailScreen({
  route,
}: {
  route: CustomerCourseDetailRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const course = route.params.course

  const {mutateAsync: updateMutate} = useCustomerCourseUpdateMutation()
  const {refreshing, onRefresh} = useRefresh(() => {})

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {refreshing ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <CustomerCourseForm
          key={route.params.course.id}
          course={course}
          onSubmit={async (formData: CustomerCourseFormData) => {
            const updateParams: CustomerCourseUpdateProps = {
              id: course.id,
              ...formData,
            }
            await updateMutate(updateParams)
          }}
        />
      )}
    </ScrollView>
  )
}
