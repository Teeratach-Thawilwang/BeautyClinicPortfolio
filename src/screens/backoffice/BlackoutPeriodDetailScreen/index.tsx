import React from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import BlackoutPeriodForm from '@components/Backoffice/BlackoutPeriodForm'
import {useTheme} from '@context-providers/ThemeProvider'
import {useRefresh} from '@hooks/CommonHooks'
import {
  BlackoutPeriodFormData,
  useBlackoutPeriodDeleteMutation,
  useBlackoutPeriodUpdateMutation,
  useQueryBlackoutPeriodById,
} from '@hooks/backoffice/BlackoutPeriodHooks'
import {BlackoutPeriodDetailRouteProp} from '@navigation/backoffice/BackOfficeNavigator'

import {getStyles} from './styles'

export default function BlackoutPeriodDetailScreen({
  route,
}: {
  route: BlackoutPeriodDetailRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  const {
    data: blackoutPeriod,
    isFetching: isLoading,
    refetch: refetch,
  } = useQueryBlackoutPeriodById(route.params.blackoutPeridId)

  const {mutate: updateMutate} = useBlackoutPeriodUpdateMutation()
  const {mutate: deleteMutate} = useBlackoutPeriodDeleteMutation()

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
        <BlackoutPeriodForm
          key={route.params.blackoutPeridId}
          onSubmit={async (formData: BlackoutPeriodFormData) => {
            updateMutate(formData)
          }}
          onDelete={async () => {
            if (blackoutPeriod) deleteMutate(blackoutPeriod.id)
          }}
          blackoutPeriod={blackoutPeriod!}
        />
      )}
    </ScrollView>
  )
}
