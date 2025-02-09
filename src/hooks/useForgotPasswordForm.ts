import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function useForgotPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
