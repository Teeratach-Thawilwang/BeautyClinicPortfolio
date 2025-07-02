import React, {useCallback, useMemo} from 'react'
import {FlatList, Text, View} from 'react-native'

import Button from '@components/Button'
import HeaderBar from '@components/HeaderBar'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {WorkingTime} from '@models/backoffice/CourseTypes'
import {CourseDetailScreenRouteProp} from '@navigation/AppNavigator'

import IconDetail from './Components/IconDetail'
import ImageCarousel from './Components/ImageCarousel'
import {getStyles} from './styles'
import {CourseDetailItem} from './types'

const data: CourseDetailItem[] = [
  {type: 'carousel'},
  {type: 'icon'},
  {type: 'description'},
  {type: 'worktime'},
]

export default function CourseDetailScreen({
  route,
}: {
  route: CourseDetailScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const course = route.params.course

  const concatTimeArray = useCallback(
    (times: WorkingTime): string => {
      return times.reduce((sum, item, index) => {
        const endingText = index === times.length - 1 ? '.' : ', '
        return `${sum}${item.start}-${item.end}${endingText}`
      }, '')
    },
    [course.id],
  )

  const workTimes = useMemo(() => {
    return {
      monday: concatTimeArray(course.working_time_monday),
      tuesday: concatTimeArray(course.working_time_tuesday),
      wednesday: concatTimeArray(course.working_time_wednesday),
      thursday: concatTimeArray(course.working_time_thursday),
      friday: concatTimeArray(course.working_time_friday),
      saturday: concatTimeArray(course.working_time_saturday),
      sunday: concatTimeArray(course.working_time_sunday),
    }
  }, [course.id])

  function renderItem({item}: {item: CourseDetailItem}) {
    switch (item.type) {
      case 'carousel':
        return <ImageCarousel images={course.images} />
      case 'icon':
        return (
          <IconDetail
            round={course.treatment_rounds}
            duration={course.duration_per_round}
            price={course.price}
          />
        )
      case 'description':
        return (
          <View style={styles.TextContainer}>
            <Text style={styles.title}>Information</Text>
            <Text style={styles.text}>{course.description}</Text>
          </View>
        )
      case 'worktime':
        return (
          <View style={styles.TextContainer}>
            <Text style={styles.title}>Work time</Text>
            {Object.entries(workTimes).map(([day, times]) =>
              times.length !== 0 ? (
                <Text key={day} style={styles.text}>
                  {day.charAt(0).toUpperCase() + day.slice(1)} {times}
                </Text>
              ) : null,
            )}
          </View>
        )
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      <HeaderBar title={course.name} containerStyle={styles.headerBar} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.type + index}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      />
      <Button
        onPress={() => navigation.navigate('CheckoutScreen', {course: course})}
        containerStyle={styles.buttonContainer}
        labelStyle={styles.buttonLabel}>
        Buy
      </Button>
    </View>
  )
}
