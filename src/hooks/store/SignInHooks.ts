import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import AuthService from '@services/AuthService'

import {useNavigate} from '../CommonHooks'

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type SignInFormData = z.infer<typeof signInSchema>

export function useSignInForm(email?: string, password?: string) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
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

export function useSignInMutation() {
  const navigation = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const mutation = useMutation({
    mutationFn: (formData: SignInFormData) =>
      AuthService.signInWithEmail(formData.email, formData.password),
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTabScreens',
            state: {
              routes: [{name: 'Home'}],
              index: 0,
            },
          },
        ],
      })
    },
    onError: () => {
      setIsModalVisible(true)
    },
  })
  return {...mutation, isModalVisible, setIsModalVisible}
}
