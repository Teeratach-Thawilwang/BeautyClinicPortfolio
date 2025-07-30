import React, {useMemo} from 'react'
import {View} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import Carousel, {Pagination} from 'react-native-reanimated-carousel'

import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'

import ImageItem from '../ImageItem'
import {getStyles} from './styles'
import {Props} from './types'

export default function ImageCarousel({images}: Props) {
  const {width, responsive} = useResponsiveScreen()
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const scrollOffsetValue = useSharedValue<number>(0)
  const progress = useSharedValue<number>(0)
  const itemWidth = width - 20
  const itemHeight = itemWidth * 0.7
  const paginateData = useMemo(() => images.map(_ => ({color: ''})), [images])

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
        width={itemWidth}
        height={itemHeight}
        autoFillData={true}
        pagingEnabled={true}
        defaultScrollOffsetValue={scrollOffsetValue}
        onConfigurePanGesture={gesture => {
          'worklet'
          gesture.activeOffsetX([-10, 10])
          gesture.failOffsetY([-10, 10])
        }}
        onProgressChange={(offset: number) => {
          ;('worklet')
          const snapPoint = Math.abs(offset / itemWidth)
          progress.value = snapPoint
        }}
        renderItem={({item, index}) => <ImageItem key={index} uri={item.uri} />}
        style={styles.container}
      />
      <Pagination.Basic<{color: string}>
        key={`course-images-pagination-${responsive}`}
        progress={progress}
        horizontal={true}
        data={paginateData}
        dotStyle={styles.paginateDot}
        activeDotStyle={styles.paginateActiveDot}
        containerStyle={styles.paginateContainer}
      />
    </View>
  )
}
