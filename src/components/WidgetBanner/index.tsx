import React from 'react'
import {Image, View} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import Carousel, {Pagination} from 'react-native-reanimated-carousel'

import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function WidgetBanner({banners}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {width, responsive} = useResponsiveScreen()
  const scrollOffsetValue = useSharedValue<number>(0)
  const progress = useSharedValue<number>(0)

  return (
    <View style={styles.container}>
      <Carousel
        testID='widget-banner-carousel'
        loop={true}
        height={200}
        width={width - 20}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlay={true}
        autoPlayInterval={2000}
        data={banners}
        defaultScrollOffsetValue={scrollOffsetValue}
        onConfigurePanGesture={gesture => {
          'worklet'
          gesture.activeOffsetX([-10, 10])
          gesture.failOffsetY([-10, 10])
        }}
        onSnapToItem={(index: number) => {
          progress.value = index
        }}
        renderItem={({item}) => {
          return (
            <View style={styles.imageContainer}>
              <Image source={{uri: item.image.uri}} style={styles.image} />
            </View>
          )
        }}
      />
      <Pagination.Basic<{color: string}>
        key={`banner-pagination-${responsive}`}
        progress={progress}
        horizontal={true}
        data={banners.map(_ => ({color: ''}))}
        dotStyle={styles.paginateDot}
        activeDotStyle={styles.paginateActiveDot}
        containerStyle={styles.paginateContainer}
      />
    </View>
  )
}
