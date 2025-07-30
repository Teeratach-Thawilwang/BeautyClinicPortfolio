import React, {useMemo} from 'react'
import {View} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import Carousel, {Pagination} from 'react-native-reanimated-carousel'

import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'

import WidgetBannerItem from './Components/WidgetBannerItem'
import {getStyles} from './styles'
import {Props} from './types'

export default function WidgetBanner({banners}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {width, responsive} = useResponsiveScreen()
  const scrollOffsetValue = useSharedValue<number>(0)
  const progress = useSharedValue<number>(0)
  const itemWidth = width - 20
  const itemHeight = itemWidth * 0.5
  const itemCount = banners.length
  const maxLength = itemCount * itemWidth
  const paginateData = useMemo(() => banners.map(_ => ({color: ''})), [banners])

  return (
    <View style={styles.container}>
      <Carousel
        testID='widget-banner-carousel'
        data={banners}
        loop={true}
        width={itemWidth}
        height={itemHeight}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlay={true}
        autoPlayInterval={2000}
        defaultScrollOffsetValue={scrollOffsetValue}
        onConfigurePanGesture={gesture => {
          'worklet'
          gesture.activeOffsetX([-10, 10])
          gesture.failOffsetY([-10, 10])
        }}
        onProgressChange={offset => {
          ;('worklet')
          const calculateOffset = Math.abs(maxLength - offset) / itemWidth
          const snapPoint = calculateOffset % itemCount
          progress.value = snapPoint
        }}
        renderItem={({item}) => {
          return (
            <WidgetBannerItem
              item={item}
              width={itemWidth}
              height={itemHeight}
            />
          )
        }}
        style={styles.carousel}
      />
      <Pagination.Basic<{color: string}>
        key={`banner-pagination-${responsive}`}
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
