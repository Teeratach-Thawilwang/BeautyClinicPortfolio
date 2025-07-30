import React, {useMemo} from 'react'
import {Text, View} from 'react-native'
import {TouchableRipple} from 'react-native-paper'
import Animated from 'react-native-reanimated'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate, useResponsiveScreen} from '@hooks/CommonHooks'

import WidgetCourseItemDetail from '../WidgetCourseItemDetail'
import {getStyles} from './styles'
import {Props} from './types'

export default function WidgetCourseItem({courses}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {responsive} = useResponsiveScreen()
  const snapLenght = 152 + 10 // WidgetCourseItemDetail's width + margin

  const coursesData = useMemo(
    () => cloneData(courses.courses, responsive == 'MOBILE' ? 3 : 6),
    [courses.courses, responsive],
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
      <Animated.FlatList
        data={coursesData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={snapLenght}
        disableIntervalMomentum={true}
        decelerationRate='fast'
        snapToAlignment='start'
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
        keyExtractor={(_, index) => `${courses.categoryId}-${index}`}
        renderItem={({item}) => {
          return (
            <WidgetCourseItemDetail
              course={item}
              category={{
                id: courses.categoryId,
                name: courses.categoryName,
              }}
            />
          )
        }}
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
