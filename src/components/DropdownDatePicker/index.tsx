import React, {useRef, useState} from 'react'
import {View, useWindowDimensions} from 'react-native'
import {
  IconButton,
  Modal,
  Portal,
  Text,
  TouchableRipple,
} from 'react-native-paper'
import {DateType} from 'react-native-ui-datepicker'

import DateTimePicker from '@components/DateTimePicker'
import {useTheme} from '@context-providers/ThemeProvider'
import {getDeviceTimezone} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

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
}: Props) {
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

      const marginRight = 10
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
              onChange({
                date: undefined,
                dates: undefined,
                startDate: undefined,
                endDate: undefined,
              })
            }}
          />
        </>
      </TouchableRipple>
      <Portal>
        <Modal
          style={{
            width: styles.contentContainer.width,
            height: styles.contentContainer.height,
            ...calculateDropdownPosition(),
          }}
          contentContainerStyle={[
            styles.contentContainer,
            contentContainerStyle,
          ]}
          testID='dropdown-date-picker-modal'
          visible={visible}
          onDismiss={() => {
            setVisible(false)
            setLabel(dateText.current ?? placeholder)
          }}>
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
                const startDateText = data.startDate
                  ? transformDate(data.startDate as Date)
                  : null
                const endDateText = data.endDate
                  ? transformDate(data.endDate as Date)
                  : null

                dateText.current = data.startDate
                  ? startDateText
                  : data.startDate && data.endDate
                    ? `${startDateText} - ${endDateText}`
                    : null
              }
              onChange(data)
            }}
          />
        </Modal>
      </Portal>
    </View>
  )
}
