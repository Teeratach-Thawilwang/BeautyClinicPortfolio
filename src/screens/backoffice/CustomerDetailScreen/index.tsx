import React, {useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useFocusEffect, useRefresh} from '@hooks/CommonHooks'
import {CustomerDetailRouteProp} from '@navigation/backoffice/BackOfficeNavigator'

import CourseList from './Components/CourseList'
import CustomerInformation from './Components/CustomerInformation'
import {getStyles} from './styles'

export default function CustomerDetailScreen({
  route,
}: {
  route: CustomerDetailRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [refresh, setRefresh] = useState(false)

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
        <>
          <CustomerInformation customer={route.params.customer} />
          <CourseList customerId={route.params.customer.id} />
        </>
      )}
    </ScrollView>
  )
}
