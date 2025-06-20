import {CustomerCourseFormData} from '@hooks/backoffice/CustomerCourseHooks'
import {CustomerCourse} from '@models/backoffice/CustomerCourseType'

export type Props = {
  course: CustomerCourse
  onSubmit: (formData: CustomerCourseFormData) => void
}
