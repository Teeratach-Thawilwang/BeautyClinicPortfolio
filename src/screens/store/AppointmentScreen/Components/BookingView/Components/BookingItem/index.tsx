import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import React, {useState} from 'react'
import {Image, Text, View} from 'react-native'
import {Divider} from 'react-native-paper'

import Button from '@components/Button'
import ConfirmModal from '@components/ConfirmModal'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {useCancelBookingMutation} from '@hooks/store/BookingHooks'

import {getStyles} from './styles'
import {Props} from './types'

dayjs.extend(utc)
dayjs.extend(timezone)

export default function BookingItem({booking, onCancel}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {
    id,
    customer_course_id: customerCourseId,
    name: courseName,
    images,
    appointment_editable_before: editableBeforeHours,
    booking_date: bookingDate,
    booking_time: bookingTime,
  } = booking
  const imageUri = images.length > 0 ? images[0].uri : ''

  const customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)

  const dateString = dayjs(bookingDate, 'DD-MM-YYYY').format('D MMM YYYY')
  const diffInHours = dayjs(
    `${bookingDate}-${bookingTime.start}`,
    'DD-MM-YYYY-HH:mm',
  ).diff(dayjs(), 'hour', true)
  const editable = diffInHours > editableBeforeHours

  const [showModal, setShowModal] = useState(false)

  const {mutateAsync: cancelBooking} = useCancelBookingMutation()

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={{uri: imageUri}} style={styles.image} />
        <View style={styles.detailContainer}>
          <Text style={styles.title}>
            {dateString} - {bookingTime.start}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            คอร์ส {courseName}
          </Text>
        </View>
      </View>
      {editable ? (
        <>
          <Divider style={styles.deviderContent} />
          <View style={styles.buttonBox}>
            <Button
              onPress={() => {
                setShowModal(true)
              }}
              containerStyle={styles.cancelButtonContainer}
              labelStyle={styles.cancelButtonLabel}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('EditBookingScreen', {
                  bookingId: id,
                  customerCourseId: customerCourseId,
                  date: bookingDate,
                  time: bookingTime,
                })
              }}
              containerStyle={styles.editButtonContainer}
              labelStyle={styles.editButtonLabel}>
              Reschedule
            </Button>
          </View>
        </>
      ) : null}

      <ConfirmModal
        isVisible={showModal}
        text='คุณต้องการจะยกเลิกนัดนี้ใช่หรือไม่ ?'
        onConfirm={async () => {
          await cancelBooking(id)
          onCancel()
        }}
        onDismiss={() => setShowModal(false)}
      />
    </View>
  )
}
