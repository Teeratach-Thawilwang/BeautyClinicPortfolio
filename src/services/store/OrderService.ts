import dayjs from 'dayjs'

import {paymentFee} from '@assets/constants/Payment'
import {PaymentMethod} from '@enums/PaymentEnums'
import {ChargeStatusEnum, OrderStatusEnum} from '@enums/StatusEnums'
import {
  CardDetail,
  CreateChargeProps,
  CreateChargeResponse,
  CreateOrderProps,
  CreateOrderResponse,
  OrderHistoryItem,
  OrderHistoryList,
} from '@models/store/OrderTypes'
import supabase from '@services/SupabaseClient'
import {toFormUrlEncoded} from '@utils/Helpers'

class OrderService {
  tableName = 'orders'

  public async getList(
    status?: OrderStatusEnum,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'id',
    orderBy: 'ASC' | 'DESC' = 'DESC',
  ): Promise<OrderHistoryList> {
    const sessionResponse = await supabase.auth.getSession()
    const user = sessionResponse.data.session?.user
    if (!user) {
      throw new Error('Only authenticated user has permission.')
    }

    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(this.tableName)
      .select(
        `
        *,
        courses(
          id,
          name,
          images,
          price,
          treatment_rounds,
          duration_per_round
        )
        `,
        {count: 'exact'},
      )
      .eq('user_id', user.id)
      .order(sortBy, {ascending: orderBy == 'ASC'})

    if (status) {
      query = query.eq('status', status)
    }

    const {data, error, count} = await query.range(from, to)
    if (error) throw error

    const transformData = data.map(item => {
      const createdAt = dayjs(item.created_at).format('DD/MM/YYYY HH:mm')
      return {
        ...item,
        created_at: createdAt,
      }
    })

    return {
      data: transformData as unknown as OrderHistoryItem[],
      last: count ? Math.ceil(count / perPage) : 1,
      total: count ?? 0,
    }
  }

  public async create(params: CreateOrderProps): Promise<CreateOrderResponse> {
    const sessionResponse = await supabase.auth.getSession()
    const accessToken = sessionResponse.data.session?.access_token
    if (!accessToken) {
      throw new Error('Only authenticated user has permission.')
    }
    const response = await fetch(
      process.env.SUPABASE_URL + '/functions/v1/create-order',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      },
    )

    const result = await response.json()
    if (!response.ok) {
      throw result
    }
    return result
  }

  public async createCharge(
    params: CreateChargeProps,
  ): Promise<CreateChargeResponse> {
    const sessionResponse = await supabase.auth.getSession()
    const accessToken = sessionResponse.data.session?.access_token
    if (!accessToken) {
      throw new Error('Only authenticated user has permission.')
    }
    const payload: CreateChargeProps = {
      ...params,
      returnUri: params.returnUri ?? process.env.APP_LINK + '/',
    }
    const response = await fetch(
      process.env.SUPABASE_URL + '/functions/v1/create-charge',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    const result = await response.json()
    if (!response.ok) {
      throw result
    }
    return result
  }

  public async createOmiseToken(card: CardDetail): Promise<string> {
    const publicKey = process.env.OMISE_PUBLIC_KEY

    const cardData = {
      'card[name]': card.name,
      'card[number]': card.number,
      'card[expiration_month]': card.expirationMonth,
      'card[expiration_year]': card.expirationYear,
      'card[security_code]': card.securityCode,
    }
    const formBody = toFormUrlEncoded(cardData)
    const response = await fetch('https://vault.omise.co/tokens', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(publicKey + ':'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })

    const result = await response.json()

    if (!response.ok || result.object !== 'token') {
      throw result || new Error('Failed to create Omise token')
    }

    return result.id
  }

  public async getPaymentStatus(chargeId: string): Promise<ChargeStatusEnum> {
    const sessionResponse = await supabase.auth.getSession()
    const userId = sessionResponse.data.session?.user.id
    const accessToken = sessionResponse.data.session?.access_token
    if (!accessToken || !userId) {
      throw new Error('Only authenticated user has permission.')
    }

    const payload = {
      chargeId,
      userId,
    }
    const response = await fetch(
      process.env.SUPABASE_URL + '/functions/v1/get-payment-status',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    const result = await response.json()
    if (!response.ok) {
      throw result
    }
    return result
  }

  public calculatePaymentFee(
    amount: number,
    paymentMethod: PaymentMethod,
    vat: number = 7,
  ) {
    const stang = amount * 100
    let fee = 0
    if (paymentFee[paymentMethod].type == 'FIX_COST') {
      fee = paymentFee[paymentMethod].fee * 100
    } else {
      fee = (stang * paymentFee[paymentMethod].fee) / 100
    }

    fee = fee * (1 + vat / 100)
    return Math.ceil(fee) / 100
  }
}

export default new OrderService()
