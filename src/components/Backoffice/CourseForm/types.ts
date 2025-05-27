import {CourseFormData} from '@hooks/backoffice/CourseHooks'
import {Category} from '@models/CategoryTypes'
import {Course} from '@models/CourseTypes'

export type Props = {
  onSubmit: (formData: CourseFormData) => void
  onDelete?: (() => Promise<void>) | (() => void)
  categories: Category[]
  course?: Course
}
