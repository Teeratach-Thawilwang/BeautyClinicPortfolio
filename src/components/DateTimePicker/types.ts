import {DateType} from 'react-native-ui-datepicker'

export type DataOnChange = {
  date?: DateType
  dates?: DateType[]
  startDate?: DateType
  endDate?: DateType
}

export type Props = {
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
}
