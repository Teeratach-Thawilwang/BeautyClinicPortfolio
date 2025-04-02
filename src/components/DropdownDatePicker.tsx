import React, {useRef, useState} from 'react'
import {StyleSheet, View, useWindowDimensions} from 'react-native'
import Modal from 'react-native-modal'
import {IconButton, Text, TouchableRipple} from 'react-native-paper'
import {DateType} from 'react-native-ui-datepicker'

import DateTimePicker, {DataOnChange} from '@components/DateTimePicker'
import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'
import {getDeviceTimezone} from '@utils/Helpers'

export default function DropdownDatePicker({
  mode,
  placeholder,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  containerStyle,
  contentContainerStyle,
  placeholderStyle,
  placeholderIconColor,
}: {
  mode: 'single' | 'multiple' | 'range'
  placeholder: string
  onChange: (data: DataOnChange) => void
  minDate?: DateType
  maxDate?: DateType
  disabledDates?: DateType[] | ((date: DateType) => boolean)
  containerStyle?: any
  contentContainerStyle?: any
  placeholderStyle?: any
  placeholderIconColor?: any
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState<string>(placeholder)
  const dateText = useRef<string | null>(null)
  const singleDate = useRef<DateType>()
  const multipleDate = useRef<DateType[]>()
  const startDate = useRef<DateType>()
  const endDate = useRef<DateType>()
  const anchorRef = useRef<View>(null)
  const {width: screenWidth, height: screenHeight} = useWindowDimensions()

  const contentWidth = contentContainerStyle
    ? contentContainerStyle.width
    : styles.contentContainer.width
  const contentHeight = contentWidth - 20

  function transformDate(date: Date) {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: getDeviceTimezone(),
    })
  }

  function calculateDropdownPosition() {
    if (!anchorRef) return {top: 0, left: 0}

    let top = 0
    let left = 0
    anchorRef.current?.measure((_x, _y, _width, height, pageX, pageY) => {
      // width, height is anchor's width-height.
      // pageX, pageY is position of anchor (0-screenWidth, 0-screenHeight).
      const marginTop = 10
      top = pageY + height + marginTop
      left = pageX

      const marginRight = 20
      const right = pageX + contentWidth
      if (right >= screenWidth) {
        left = pageX - (right - screenWidth) - marginRight
      }

      const offsetY = 100
      const marginBottom = 20
      const bottom = pageY + height + marginBottom + contentHeight + offsetY
      if (bottom >= screenHeight) {
        top = pageY - height - marginBottom - contentHeight
      }
    })

    return {top: top, left: left}
  }

  return (
    <View>
      <TouchableRipple
        ref={anchorRef}
        style={{...styles.container, ...containerStyle}}
        onPress={() => setVisible(val => !val)}>
        <>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{...styles.placeholder, ...placeholderStyle}}>
            {label}
          </Text>
          <IconButton
            style={styles.iconButton}
            icon={dateText.current ? 'close' : 'calendar-month-outline'}
            size={20}
            iconColor={placeholderIconColor ?? theme.colors.onSurfaceVariant}
            onPress={() => {
              dateText.current = null
              singleDate.current = undefined
              multipleDate.current = undefined
              startDate.current = undefined
              endDate.current = undefined
              setLabel(placeholder)
            }}
          />
        </>
      </TouchableRipple>
      <Modal
        style={{
          ...styles.contentContainer,
          ...contentContainerStyle,
          position: 'absolute',
          ...calculateDropdownPosition(),
        }}
        testID='react-native-modal'
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false)
          setLabel(dateText.current ?? placeholder)
        }}
        animationIn='fadeIn'
        animationOut='fadeOut'
        animationInTiming={1}
        animationOutTiming={1}
        backdropColor='transparent'>
        <DateTimePicker
          mode={mode}
          containerHeight={contentHeight}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          initialSingleDate={singleDate.current}
          initialMultipleDate={multipleDate.current}
          initialStartDate={startDate.current}
          initialEndDate={endDate.current}
          onChange={data => {
            if (mode === 'single') {
              singleDate.current = data.date
              dateText.current = data.date
                ? transformDate(data.date as Date)
                : null
            }
            if (mode === 'multiple') {
              multipleDate.current = data.dates
              dateText.current =
                data.dates?.length != 0
                  ? data
                      .dates!.map((item: DateType) =>
                        transformDate(item as Date),
                      )
                      .join(', ')
                  : null
            }
            if (mode === 'range') {
              startDate.current = data.startDate
              endDate.current = data.endDate
              dateText.current =
                data.startDate && data.endDate
                  ? `${transformDate(data.startDate as Date)} - ${transformDate(
                      data.endDate as Date,
                    )}`
                  : null
            }
            onChange(data)
          }}
        />
      </Modal>
    </View>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      width: 200,
      marginVertical: 20,
      paddingVertical: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentContainer: {
      margin: 0,
      padding: 0,
      width: 300,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      overflow: 'hidden',
    },
    placeholder: {
      color: theme.colors.onSurface,
      fontSize: theme.fonts.bodyLarge.fontSize,
    },
    iconButton: {
      width: 20,
      height: 20,
      margin: 0,
    },
  })
}
