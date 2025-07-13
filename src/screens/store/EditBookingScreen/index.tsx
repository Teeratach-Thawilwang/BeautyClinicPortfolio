import React, {useRef} from 'react'
import {ScrollView, Text, View} from 'react-native'

import BookingForm from '@components/BookingForm'
import HeaderBar from '@components/HeaderBar'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {
  useGetBookingTimeAvailableMutation,
  useUpdateBookingMutation,
} from '@hooks/store/BookingHooks'
import {EditBookingScreenRouteProp} from '@navigation/AppNavigator'

import {getStyles} from './styles'

export default function EditBookingScreen({
  route,
}: {
  route: EditBookingScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const scrollRef = useRef<ScrollView>(null)
  const {bookingId, customerCourseId, date, time} = route.params

  const {
    mutate: getAvailableSlot,
    data: availableSlot,
    isPending: timeSlotLoading,
  } = useGetBookingTimeAvailableMutation()

  const {mutateAsync: updateBooking} = useUpdateBookingMutation()

  return (
    <View style={styles.container}>
      <HeaderBar title='Edit Appointment' containerStyle={styles.headerBar} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}>
        <BookingForm
          initialDate={date}
          initialTime={time}
          availableSlots={availableSlot}
          timeSlotLoading={timeSlotLoading}
          onDateChange={date => {
            getAvailableSlot({
              customerCourseId: customerCourseId,
              date: date,
            })
          }}
          onSubmit={async data => {
            await updateBooking({
              id: bookingId,
              booking_date: data.date,
              booking_time: data.time,
            })
            navigation.replace('BottomTabScreens', {
              screen: 'Appointment',
              params: {tab: 'Booking'},
            })
          }}
        />
      </ScrollView>
    </View>
  )
}
