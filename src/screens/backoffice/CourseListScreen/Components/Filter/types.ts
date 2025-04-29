import {CourseStatus} from '@enums/StatusEnums'

export type Props = {
  onChange: (type: string, value: any) => void
  initialStatus?: CourseStatus
  initialOrderBy?: 'ASC' | 'DESC'
  initialStartCreatedAt?: Date
  initialStopCreatedAt?: Date
  refreshing: boolean
}
