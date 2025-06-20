import {CourseFormData} from '@hooks/backoffice/CourseHooks'
import {Category} from '@models/backoffice/CategoryTypes'
import {Course} from '@models/backoffice/CourseTypes'

export type Props = {
  onSubmit: (formData: CourseFormData) => void
  onDelete?: (() => Promise<void>) | (() => void)
  categories: Category[]
  course?: Course
}
