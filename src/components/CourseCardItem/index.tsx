import React from 'react'
import {Image, Text, View} from 'react-native'
import {Divider, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {getDurationText, getTreatmentText} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

export default function CourseCardItem({
  course,
  isShowCategory,
  isPressable = true,
}: Props) {
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
        if (isPressable) {
          navigation.navigate('CourseDetailScreen', {
            course: course,
            category: course.category,
          })
        }
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
          {isShowCategory ? (
            <View style={styles.textCategoryContainer}>
              <Text style={styles.textCategory}>{course.category?.name}</Text>
            </View>
          ) : null}
        </View>
      </>
    </TouchableRipple>
  )
}
