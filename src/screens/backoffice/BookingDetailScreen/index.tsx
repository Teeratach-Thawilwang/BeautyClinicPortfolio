import React from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import BookingForm from '@components/Backoffice/BookingForm'
import {useTheme} from '@context-providers/ThemeProvider'
import {useRefresh} from '@hooks/CommonHooks'
import {
  BookingFormData,
  useBookingDeleteMutation,
  useBookingUpdateMutation,
  useQueryBookingById,
} from '@hooks/backoffice/BookingHooks'
import {BookingUpdateProps} from '@models/backoffice/BookingTypes'
import {BookingDetailRouteProp} from '@navigation/backoffice/BackOfficeNavigator'
import AuthService from '@services/AuthService'

import {getStyles} from './styles'

export default function BookingDetailScreen({
  route,
}: {
  route: BookingDetailRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const user = AuthService.getUser()

  const {
    data: booking,
    isFetching: isLoading,
    refetch: refetch,
  } = useQueryBookingById(route.params.bookingId)

  const {mutateAsync: updateMutate} = useBookingUpdateMutation()
  const {mutateAsync: deleteMutate} = useBookingDeleteMutation()

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
        <BookingForm
          key={route.params.bookingId}
          onSubmit={async (formData: BookingFormData) => {
            if (!user) return
            const updateParams: BookingUpdateProps = {
              ...formData,
              update_by: user.id,
            }
            await updateMutate(updateParams)
          }}
          onDelete={async () => {
            if (booking) await deleteMutate(booking.id)
          }}
          booking={booking!}
        />
      )}
    </ScrollView>
  )
}
