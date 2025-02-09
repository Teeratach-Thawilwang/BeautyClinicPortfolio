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

export type SignupFormData = z.infer<typeof signupSchema>

export default function useSignUpForm() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
