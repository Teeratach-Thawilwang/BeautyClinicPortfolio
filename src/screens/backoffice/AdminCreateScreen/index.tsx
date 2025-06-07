import React, {useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useFocusEffect, useRefresh} from '@hooks/CommonHooks'
import {useAdminCreateMutation} from '@hooks/backoffice/AdminHooks'

import AdminForm from './Components/AdminForm'
import {getStyles} from './styles'

export default function AdminCreateScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [refresh, setRefresh] = useState(false)

  const {mutateAsync} = useAdminCreateMutation()

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
        <AdminForm
          onSubmit={async formData => {
            await mutateAsync(formData.email)
          }}
        />
      )}
    </ScrollView>
  )
}
