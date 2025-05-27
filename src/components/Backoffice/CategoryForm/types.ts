import {CategoryFormData} from '@hooks/backoffice/CategoryHooks'
import {Category} from '@models/CategoryTypes'

export type Props = {
  onSubmit: (formData: CategoryFormData) => void
  onDelete?: (() => Promise<void>) | (() => void)
  category?: Category
}
