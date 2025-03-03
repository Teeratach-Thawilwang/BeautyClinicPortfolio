import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

export const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type SignInFormData = z.infer<typeof signinSchema>

export default function useSignInForm(email?: string, password?: string) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: email ?? '',
      password: password ?? '',
    },
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
