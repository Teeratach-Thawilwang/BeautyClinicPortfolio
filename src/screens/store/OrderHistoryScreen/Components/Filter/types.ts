import {OrderStatusEnum} from '@enums/StatusEnums'

export type Props = {
  onChange: (value: any) => void
  initialStatus?: OrderStatusEnum
  initialOrderBy?: 'ASC' | 'DESC'
  searchCount: number
}
