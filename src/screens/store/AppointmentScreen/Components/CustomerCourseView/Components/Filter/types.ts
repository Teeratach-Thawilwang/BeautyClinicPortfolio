import {CustomerCourseStatus} from '@enums/StatusEnums'

export type Props = {
  onChange: (value: any) => void
  initialStatus?: CustomerCourseStatus
  initialOrderBy?: 'ASC' | 'DESC'
  searchCount: number
}
