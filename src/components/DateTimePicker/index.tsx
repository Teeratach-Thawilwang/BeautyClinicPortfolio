import React, {useMemo, useState} from 'react'
import {Icon} from 'react-native-paper'
import UIDateTimePicker, {DateType} from 'react-native-ui-datepicker'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {DataOnChange, Props} from './types'

export default function DateTimePicker({
  mode = 'range',
  containerHeight,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  initialSingleDate,
  initialMultipleDate,
  initialStartDate,
  initialEndDate,
}: Props) {
  const {theme} = useTheme()
  const styles = useMemo(() => getStyles(theme), [theme])

  const [singleDate, setSingleDate] = useState<DateType>(initialSingleDate)
  const [multipleDate, setMultipleDate] = useState<DateType[]>(
    initialMultipleDate ?? [],
  )
  const [startDate, setStartDate] = useState<DateType>(initialStartDate)
  const [endDate, setEndDate] = useState<DateType>(initialEndDate)

  return (
    <UIDateTimePicker
      mode={mode}
      showOutsideDays
      containerHeight={containerHeight} // width = height + 20 is square container
      date={singleDate}
      dates={multipleDate}
      startDate={startDate}
      endDate={endDate}
      minDate={minDate}
      maxDate={maxDate}
      disabledDates={disabledDates}
      onChange={(data: DataOnChange) => {
        if (mode === 'single') {
          setSingleDate(data.date)
        }
        if (mode === 'multiple') {
          setMultipleDate(data.dates!)
          onChange({dates: data.dates})
          return
        }
        if (mode === 'range') {
          setStartDate(data.startDate)
          setEndDate(data.endDate)
        }
        onChange(data)
      }}
      components={{
        IconPrev: (
          <Icon
            source='ion-chevron-back'
            size={18}
            color={theme.colors.primary}
          />
        ),
        IconNext: (
          <Icon
            source='ion-chevron-forward'
            size={18}
            color={theme.colors.primary}
          />
        ),
      }}
      styles={styles}
    />
  )
}
