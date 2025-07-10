import React from 'react'
import {Text, View} from 'react-native'
import {TouchableRipple} from 'react-native-paper'
import {useSharedValue} from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate, useResponsiveScreen} from '@hooks/CommonHooks'

import WidgetCourseItemDetail from '../WidgetCourseItemDetail'
import {getStyles} from './styles'
import {Props} from './types'

export default function WidgetCourseItem({courses}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {width, responsive} = useResponsiveScreen()
  const scrollOffsetValue = useSharedValue<number>(0)
  const coursesData = cloneData(
    courses.courses,
    responsive != 'MOBILE' ? 14 : 8,
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {courses.categoryName}
        </Text>
        <TouchableRipple
          onPress={() => {
            navigation.navigate('CategoryCourseScreen', {
              categoryId: courses.categoryId,
              categoryName: courses.categoryName,
            })
          }}
          rippleColor='transparent'>
          <Text style={styles.titleButton}>ดูทั้งหมด</Text>
        </TouchableRipple>
      </View>
      <Carousel
        testID='widget-course-carousel'
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: width - 185,
          parallaxAdjacentItemScale: 1,
        }}
        data={coursesData}
        loop={true}
        width={width - 20}
        height={205}
        autoFillData={true}
        pagingEnabled={true}
        defaultScrollOffsetValue={scrollOffsetValue}
        onConfigurePanGesture={gesture => {
          'worklet'
          gesture.activeOffsetX([-10, 10])
          gesture.failOffsetY([-10, 10])
        }}
        renderItem={({item, index}) => {
          return (
            <WidgetCourseItemDetail
              key={index}
              course={item}
              category={{
                id: courses.categoryId,
                name: courses.categoryName,
              }}
            />
          )
        }}
        style={styles.carousel}
      />
    </View>
  )
}

function cloneData<T>(courses: T[], fixLenght: number = 8): T[] {
  if (courses.length >= fixLenght) {
    return courses
  }

  const cloneLenght = fixLenght - courses.length
  const multiple = Math.floor(cloneLenght / courses.length)
  const fraction = cloneLenght % courses.length
  const data = [...courses]
  for (let i = 0; i < multiple; i++) {
    data.push(...courses)
  }
  if (fraction > 0) {
    return [...data, ...courses.slice(0, fraction)]
  }
  return data
}
