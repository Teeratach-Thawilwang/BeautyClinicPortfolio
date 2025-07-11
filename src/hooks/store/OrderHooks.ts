import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import Toast from 'react-native-toast-message'
import {z} from 'zod'

import {
  CardDetail,
  CreateChargeProps,
  CreateOrderProps,
} from '@models/store/OrderTypes'
import OrderService from '@services/store/OrderService'

export function useCreateOrderMutation() {
  const mutation = useMutation({
    mutationFn: async (params: CreateOrderProps) =>
      await OrderService.create(params),
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Create order failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}

export function useCreateChargeMutation() {
  const mutation = useMutation({
    mutationFn: async (params: CreateChargeProps) =>
      await OrderService.createCharge(params),
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Create charge failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}

export function useCreateOmiseTokenMutation() {
  const mutation = useMutation({
    mutationFn: async (card: CardDetail) =>
      await OrderService.createOmiseToken(card),
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Create charge token failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}

export function useGetPaymentStatusMutation() {
  const mutation = useMutation({
    mutationFn: async (chargeId: string) =>
      await OrderService.getPaymentStatus(chargeId),
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Get payment status failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}

export const cardSchema = z.object({
  name: z
    .string()
    .min(1, 'ต้องระบุชื่อเจ้าของบัตร')
    .max(100, 'ชื่อเจ้าของบัตรยาวเกินไป'),
  number: z
    .string()
    .min(13, 'หมายเลขบัตรต้องมีอย่างน้อย 13 หลัก')
    .max(19, 'หมายเลขบัตรต้องไม่เกิน 19 หลัก')
    .regex(/^\d+$/, 'หมายเลขบัตรต้องเป็นตัวเลขเท่านั้น'),
  expiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, {
      message: 'รูปแบบต้องเป็น MM/YYYY และเดือนต้องอยู่ระหว่าง 01-12',
    })
    .refine(isNotExpired, {
      message: 'บัตรหมดอายุแล้ว',
    }),
  securityCode: z.string().regex(/^\d{3,4}$/, 'CVV ต้องมี 3 หรือ 4 หลัก'),
})

export type CardFormData = z.infer<typeof cardSchema>

export function useCardForm() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}

function isNotExpired(mmYYYY: string): boolean {
  const [monthStr, yearStr] = mmYYYY.split('/')
  const month = parseInt(monthStr)
  const year = parseInt(yearStr)
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  if (isNaN(month) || isNaN(year)) return false
  if (year < currentYear) return false
  if (year == currentYear && month < currentMonth) return false
  return true
}
