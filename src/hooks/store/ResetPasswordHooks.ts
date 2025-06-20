import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import AuthService from '@services/AuthService'

export const resetPasswordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export function useResetPasswordForm(
  email: string,
  password?: string,
  confirmPassword?: string,
) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
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

export function useResetPasswordMutation(onSuccess: () => void) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const mutation = useMutation({
    mutationFn: (formData: ResetPasswordFormData) =>
      AuthService.updatePassword(formData.email, formData.password),
    onSuccess: () => {
      setIsModalVisible(true)
      onSuccess()
    },
    onError: () => {
      setIsModalVisible(true)
    },
  })
  return {...mutation, isModalVisible, setIsModalVisible}
}

export function useVerifyRecoveryTokenMutation() {
  return useMutation({
    mutationFn: (token: string) => AuthService.verifyRecoveryToken(token),
  })
}

export function useVerifyConfirmSingupTokenMutation() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const mutation = useMutation({
    mutationFn: (token: string) => AuthService.verifyConfirmSingupToken(token),
    onSuccess: () => {
      setIsModalVisible(true)
    },
    onError: () => {
      setIsModalVisible(true)
    },
  })
  return {...mutation, isModalVisible, setIsModalVisible}
}
