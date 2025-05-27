import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

export const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpFormData = z.infer<typeof signupSchema>

export default function useSignUpForm(
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: name ?? '',
      email: email ?? '',
      password: password ?? '',
      confirmPassword: confirmPassword ?? '',
    },
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
