import React, {useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import BlackoutPeriodForm from '@components/Backoffice/BlackoutPeriodForm'
import {useTheme} from '@context-providers/ThemeProvider'
import {useFocusEffect, useRefresh} from '@hooks/CommonHooks'
import {
  BlackoutPeriodFormData,
  useBlackoutPeriodCreateMutation,
} from '@hooks/backoffice/BlackoutPeriodHooks'
import {BlackoutPeriodCreateProps} from '@models/backoffice/BlackoutPeriod'

import {getStyles} from './styles'

export default function BlackoutPeriodCreateScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [refresh, setRefresh] = useState(false)

  const {mutateAsync} = useBlackoutPeriodCreateMutation()

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
        <BlackoutPeriodForm
          onSubmit={async (formData: BlackoutPeriodFormData) => {
            const {id, ...formDataCreate} = {...formData}
            await mutateAsync(formDataCreate as BlackoutPeriodCreateProps)
          }}
        />
      )}
    </ScrollView>
  )
}
