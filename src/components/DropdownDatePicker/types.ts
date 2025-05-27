import {DateType} from 'react-native-ui-datepicker'

import {DataOnChange} from '@components/DateTimePicker/types'

export type Props = {
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
}
