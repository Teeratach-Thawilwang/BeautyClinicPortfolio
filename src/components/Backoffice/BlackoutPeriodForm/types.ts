import {BlackoutPeriodFormData} from '@hooks/backoffice/BlackoutPeriodHooks'
import {BlackoutPeriodForm} from '@models/BlackoutPeriod'

export type Props = {
  onSubmit: (formData: BlackoutPeriodFormData) => void
  onDelete?: (() => Promise<void>) | (() => void)
  blackoutPeriod?: BlackoutPeriodForm
}
