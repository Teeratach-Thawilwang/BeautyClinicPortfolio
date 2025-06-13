import {CustomerCourseStatus} from '@enums/StatusEnums'

export type Props = {
  onChange: (type: string, value: any) => void
  initialStatus?: CustomerCourseStatus
  initialOrderBy?: 'ASC' | 'DESC'
  initialStartCreatedAt?: Date
  initialStopCreatedAt?: Date
}
