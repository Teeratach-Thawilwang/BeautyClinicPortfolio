import React, {useRef} from 'react'
import {ScrollView, View} from 'react-native'

import BookingForm from '@components/BookingForm'
import HeaderBar from '@components/HeaderBar'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {
  useCreateBookingMutation,
  useGetBookingTimeAvailableMutation,
} from '@hooks/store/BookingHooks'
import {CreateBookingScreenRouteProp} from '@navigation/AppNavigator'

import {getStyles} from './styles'

export default function CreateBookingScreen({
  route,
}: {
  route: CreateBookingScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const scrollRef = useRef<ScrollView>(null)
  const customerCourseId = route.params.customerCourseId

  const {
    mutate: getAvailableSlot,
    data: availableSlot,
    isPending: timeSlotLoading,
  } = useGetBookingTimeAvailableMutation()

  const {mutateAsync: createBooking} = useCreateBookingMutation()

  return (
    <View style={styles.container}>
      <HeaderBar title='Book Appointment' containerStyle={styles.headerBar} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}>
        <BookingForm
          availableSlots={availableSlot}
          timeSlotLoading={timeSlotLoading}
          onDateChange={date => {
            getAvailableSlot({
              customerCourseId: customerCourseId,
              date: date,
            })
          }}
          onSubmit={async data => {
            await createBooking({
              customer_course_id: customerCourseId,
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
