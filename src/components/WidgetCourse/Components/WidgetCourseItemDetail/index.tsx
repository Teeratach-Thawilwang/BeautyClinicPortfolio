import React from 'react'
import {Image, Text, View} from 'react-native'
import {Divider, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {getDurationText, getTreatmentText} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

export default function WidgetCourseItemDetail({course}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const durationText = getDurationText(course.duration_per_round)
  const treatmentText = getTreatmentText(course.treatment_rounds)

  return (
    <TouchableRipple
      style={styles.container}
      rippleColor='transparent'
      onPress={() => {
        navigation.navigate('CourseDetailScreen', {course: course})
      }}>
      <>
        <Image source={{uri: course.images[0].uri}} style={styles.image} />
        <View style={styles.detailContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {course.name}
          </Text>
          <Divider style={styles.devider} />
          <Text style={styles.text}>{treatmentText}</Text>
          <Text style={styles.text}>{durationText}</Text>
          <Text style={styles.text}>Price {course.price}฿</Text>
        </View>
      </>
    </TouchableRipple>
  )
}
