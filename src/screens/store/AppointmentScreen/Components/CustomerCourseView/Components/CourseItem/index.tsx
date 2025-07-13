import React from 'react'
import {Image, Text, View} from 'react-native'
import {Divider} from 'react-native-paper'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function CourseItem({course}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {duration, unit} =
    course.duration_per_round >= 1
      ? {duration: course.duration_per_round, unit: 'ชั่วโมง'}
      : {duration: course.duration_per_round * 60, unit: 'นาที'}
  const bookingAvailableRound = course.quota_round - course.used_round

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={{uri: course.images.length > 0 ? course.images[0].uri : ''}}
          style={styles.image}
        />
        <View style={styles.detailContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {course.name}
          </Text>
          <Divider style={styles.devider} />
          <Text style={styles.text}>
            จำนวนนัดหมาย {course.quota_round} ครั้ง
          </Text>
          <Text style={styles.text}>
            นัดหมายคงเหลือ {bookingAvailableRound} ครั้ง
          </Text>
          <Text style={styles.text}>
            ระยะเวลาต่อรอบ {duration} {unit}
          </Text>
        </View>
      </View>
      {bookingAvailableRound > 0 ? (
        <>
          <Divider style={styles.deviderContent} />
          <Button
            onPress={() => {
              navigation.navigate('CreateBookingScreen', {
                customerCourseId: course.id,
              })
            }}
            containerStyle={styles.buttonContainer}>
            Booking
          </Button>
        </>
      ) : null}
    </View>
  )
}
