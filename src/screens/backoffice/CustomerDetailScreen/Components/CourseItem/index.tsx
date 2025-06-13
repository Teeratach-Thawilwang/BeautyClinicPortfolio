import React from 'react'
import {Image, Text, View} from 'react-native'
import {IconButton, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function CourseItem({course}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  function onPress() {
    navigation.navigate('BackOfficeScreens', {
      screen: 'CustomerCourseDetail',
      params: {course: course},
    })
  }

  return (
    <TouchableRipple onPress={onPress} style={styles.container}>
      <>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.fleidText}>Course</Text>
            <Text style={styles.labelText}>{course.course.name}</Text>
          </View>
          <IconButton
            style={styles.iconButton}
            icon='mat-edit'
            size={20}
            iconColor={theme.colors.onSurfaceVariant}
            onPress={onPress}
          />
        </View>
        <View style={styles.usageRound}>
          <View style={styles.usageRoundItem}>
            <Text style={styles.fleidText}>Treatment round</Text>
            <Text style={styles.labelText}>{course.quota_round}</Text>
          </View>
          <View style={styles.usageRoundItem}>
            <Text style={styles.fleidText}>Used round</Text>
            <Text style={styles.labelText}>{course.used_round}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.marginTop]}>
          <View style={styles.imageContainer}>
            <Image
              source={
                course.course.images.length > 0
                  ? course.course.images[0]
                  : require('@assets/images/image_placeholder.png')
              }
              style={styles.image}
            />
          </View>
          <View>
            <View style={[styles.row]}>
              <Text style={styles.fleidText}>Order ID</Text>
              <Text style={styles.labelText}>{course.order_id}</Text>
            </View>
            <View style={[styles.row, styles.marginTop]}>
              <Text style={styles.fleidText}>Price</Text>
              <Text style={styles.labelText}>{course.course.price}</Text>
            </View>
            <View style={[styles.row, styles.marginTop]}>
              <Text style={styles.fleidText}>Status</Text>
              <Text style={styles.labelText}>{course.status}</Text>
            </View>
            <View style={[styles.row, styles.marginTop]}>
              <Text style={styles.fleidText}>Purchase date</Text>
              <Text style={styles.labelText}>{course.created_at}</Text>
            </View>
          </View>
        </View>
      </>
    </TouchableRipple>
  )
}
