import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

export const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type SigninFormData = z.infer<typeof signinSchema>

export default function useSigninForm() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
