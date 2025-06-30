import MultiSlider from '@ptomasroos/react-native-multi-slider'
import React, {useRef, useState} from 'react'
import {LayoutChangeEvent, Text, View} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function PriceRangeInput({
  onChangeFinish,
  values,
  min,
  max,
  step,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [labelMin, setLabelMin] = useState(min)
  const [labelMax, setLabelMax] = useState(max)
  const [size, setSize] = useState({width: 0, height: 0})
  const layoutRef = useRef<View>(null)

  function handleLayout(event: LayoutChangeEvent) {
    const {width, height} = event.nativeEvent.layout
    setSize({width, height})
  }

  return (
    <View ref={layoutRef} onLayout={handleLayout} style={styles.container}>
      <Text style={styles.text}>
        {labelMin} {'  -  '} {labelMax}
      </Text>
      <MultiSlider
        values={values}
        min={min}
        max={max}
        step={step ?? 500}
        onValuesChange={values => {
          setLabelMin(values[0])
          setLabelMax(values[1])
        }}
        onValuesChangeFinish={onChangeFinish}
        allowOverlap={false}
        snapped={false}
        sliderLength={size.width - 120}
        containerStyle={styles.sliderContainer}
        trackStyle={styles.track}
        selectedStyle={styles.selected}
        markerStyle={styles.marker}
      />
    </View>
  )
}
