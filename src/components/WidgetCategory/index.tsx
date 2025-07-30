import React from 'react'
import {Image, Text, View} from 'react-native'
import {TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate, useResponsiveScreen} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function WidgetCategory({banners}: Props) {
  const {responsive} = useResponsiveScreen()
  const {theme} = useTheme()
  const styles = getStyles(theme, responsive)
  const navigation = useNavigate()

  return (
    <View style={styles.container}>
      {responsive == 'MOBILE' ? (
        <Text style={styles.title}>หมวดหมู่</Text>
      ) : null}
      <View style={styles.flexContainer}>
        {banners.map((banner, index) => {
          return (
            <TouchableRipple
              key={index}
              style={styles.itemContainer}
              rippleColor='transparent'
              onPress={() => {
                navigation.navigate('CategoryCourseScreen', {
                  categoryId: banner.id,
                  categoryName: banner.name,
                })
              }}>
              <>
                <Image
                  source={{uri: banner.images[0].uri}}
                  style={styles.itemImage}
                />
                <Text style={styles.itemText}>{banner.name}</Text>
              </>
            </TouchableRipple>
          )
        })}
      </View>
    </View>
  )
}
