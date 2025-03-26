import React, {useRef, useState} from 'react'
import {StyleSheet} from 'react-native'
import {IconButton, Menu, Text, TouchableRipple} from 'react-native-paper'
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

  function transformDate(date: Date) {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: getDeviceTimezone(),
    })
  }

  return (
    <Menu
      elevation={0}
      contentStyle={{...styles.contentContainer, ...contentContainerStyle}}
      visible={visible}
      onDismiss={() => {
        setVisible(false)
        setLabel(dateText.current ?? placeholder)
      }}
      anchorPosition='bottom'
      anchor={
        <TouchableRipple
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
      }>
      <DateTimePicker
        mode={mode}
        containerHeight={
          contentContainerStyle
            ? contentContainerStyle.width - 20
            : styles.contentContainer.width - 20
        }
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
                    .dates!.map((item: DateType) => transformDate(item as Date))
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
    </Menu>
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
      marginTop: -10,
      paddingTop: -10,
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
