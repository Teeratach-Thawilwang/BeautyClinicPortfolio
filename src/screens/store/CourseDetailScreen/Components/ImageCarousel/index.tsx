import React from 'react'
import {Image, View} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import Carousel, {Pagination} from 'react-native-reanimated-carousel'

import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function ImageCarousel({images}: Props) {
  const {width, responsive} = useResponsiveScreen()
  const {theme} = useTheme()
  const styles = getStyles(theme, width)
  const scrollOffsetValue = useSharedValue<number>(0)
  const progress = useSharedValue<number>(0)

  return (
    <View>
      <Carousel
        testID='course-images-carousel'
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 0,
          parallaxAdjacentItemScale: 1,
        }}
        data={images}
        loop={true}
        width={width - 20}
        height={250}
        autoFillData={true}
        pagingEnabled={true}
        defaultScrollOffsetValue={scrollOffsetValue}
        onConfigurePanGesture={gesture => {
          'worklet'
          gesture.activeOffsetX([-10, 10])
          gesture.failOffsetY([-10, 10])
        }}
        onSnapToItem={(index: number) => {
          progress.value = index
        }}
        renderItem={({item, index}) => (
          <Image key={index} source={{uri: item.uri}} style={styles.image} />
        )}
        style={styles.container}
      />
      <Pagination.Basic<{color: string}>
        key={`course-images-pagination-${responsive}`}
        progress={progress}
        horizontal={true}
        data={images.map(_ => ({color: ''}))}
        dotStyle={styles.paginateDot}
        activeDotStyle={styles.paginateActiveDot}
        containerStyle={styles.paginateContainer}
      />
    </View>
  )
}
