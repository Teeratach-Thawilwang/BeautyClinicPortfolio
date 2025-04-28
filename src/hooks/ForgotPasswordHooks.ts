import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import AuthService from '@services/AuthService'
import supabase from '@services/SupabaseClient'

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function useForgotPasswordForm(email?: string) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: email ?? '',
    },
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}

export function useForgotPasswordMutation() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const mutation = useMutation({
    mutationFn: (email: string) => AuthService.forgotPassword(email),
    onSuccess: () => {
      setIsModalVisible(true)
    },
    onError: () => {
      setIsModalVisible(true)
    },
  })
  return {...mutation, isModalVisible, setIsModalVisible}
}
