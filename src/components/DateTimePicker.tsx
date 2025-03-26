import React, {useState} from 'react'
import {Icon} from 'react-native-paper'
import UIDateTimePicker, {
  DateType,
  getDefaultStyles,
} from 'react-native-ui-datepicker'

import {useTheme} from '@context-providers/ThemeProvider'

export interface DataOnChange {
  date?: DateType
  dates?: DateType[]
  startDate?: DateType
  endDate?: DateType
}

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
}: {
  mode: 'single' | 'range' | 'multiple'
  containerHeight: number
  onChange: (data: DataOnChange) => void
  minDate?: DateType
  maxDate?: DateType
  disabledDates?: DateType[] | ((date: DateType) => boolean)
  initialSingleDate?: DateType
  initialMultipleDate?: DateType[]
  initialStartDate?: DateType
  initialEndDate?: DateType
}) {
  const {theme} = useTheme()
  const defaultStyles = getDefaultStyles()
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
      styles={{
        ...defaultStyles,
        header: {
          backgroundColor: theme.colors.surfaceContainerHigh,
          height: 50,
        },
        weekdays: {
          // height: 20,
          backgroundColor: theme.colors.surfaceContainerHigh,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.surfaceVariant,
        },
        weekday_label: {color: theme.colors.primary},
        month_selector_label: {color: theme.colors.onSurface},
        year_selector_label: {color: theme.colors.onSurface},

        day: {borderRadius: 50},
        day_label: {color: theme.colors.onSurface},
        days: {backgroundColor: theme.colors.surfaceContainerHigh},
        // Current day
        today: {backgroundColor: theme.colors.surfaceContainerLow},
        today_label: {color: theme.colors.onSurface},
        // Active day
        selected: {backgroundColor: theme.colors.primary},
        selected_label: {color: theme.colors.onPrimary},
        // Range
        range_fill: {
          backgroundColor: theme.colors.primaryContainer,
          marginTop: 2,
          marginBottom: 1.5,
        },

        month: {borderRadius: 50},
        month_label: {color: theme.colors.onSurface},
        months: {backgroundColor: theme.colors.surfaceContainerHigh},
        month_selector: {marginRight: 20},
        // Active month
        selected_month: {backgroundColor: theme.colors.primary},
        selected_month_label: {color: theme.colors.onPrimary},

        year: {borderRadius: 50},
        year_label: {color: theme.colors.onSurface},
        years: {backgroundColor: theme.colors.surfaceContainerHigh},
        // Current year
        selected_year: {backgroundColor: theme.colors.surfaceContainerHighest},
        selected_year_label: {color: theme.colors.onSurface},
        // Active year
        active_year: {backgroundColor: theme.colors.primary},
        active_year_label: {color: theme.colors.onPrimary},
      }}
    />
  )
}
