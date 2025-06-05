import {TimeRange} from '@components/TimeRangePicker/types'
import {BlackoutPeriodStatus} from '@enums/StatusEnums'

export type BlackoutPeriod = {
  id: number
  date: string
  time_range: TimeRange
  created_at: string
}

export type BlackoutPeriodItem = {
  id: number
  date: string
  time_range: string
  status: BlackoutPeriodStatus
  created_at: string
}

export type BlackoutPeriodList = {
  data: BlackoutPeriodItem[]
  last: number
}

export type BlackoutPeriodCreateProps = Omit<
  BlackoutPeriod,
  'id' | 'created_at'
>

export type BlackoutPeriodUpdateProps = Omit<BlackoutPeriod, 'created_at'>

export type BlackoutPeriodForm = {
  id: number
  date: string
  time_range: TimeRange
}
