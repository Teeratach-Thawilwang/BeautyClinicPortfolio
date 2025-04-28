import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import AuthService from '@services/AuthService'

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

export function useSignUpForm(
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

export function useSignUpMutation() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const mutation = useMutation({
    mutationFn: (formData: SignUpFormData) =>
      AuthService.signUpWithEmail(
        formData.email,
        formData.password,
        formData.name,
      ),
    onSuccess: () => {
      setIsModalVisible(true)
    },
    onError: () => {
      setIsModalVisible(true)
    },
  })
  return {...mutation, isModalVisible, setIsModalVisible}
}
