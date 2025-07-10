import {ChargeStatusEnum} from '@enums/StatusEnums'
import {
  CardDetail,
  CreateOrderPayload,
  CreateOrderProps,
  CreateOrderResponse,
} from '@models/store/OrderTypes'
import supabase from '@services/SupabaseClient'
import {toFormUrlEncoded} from '@utils/Helpers'

class OrderService {
  public async create(params: CreateOrderProps): Promise<CreateOrderResponse> {
    const sessionResponse = await supabase.auth.getSession()
    const userId = sessionResponse.data.session?.user.id
    const accessToken = sessionResponse.data.session?.access_token
    if (!accessToken || !userId) {
      throw new Error('Only authenticated user has permission.')
    }
    const payload: CreateOrderPayload = {
      ...params,
      userId: userId,
      returnUri: params.returnUri ?? process.env.APP_LINK + '/',
    }
    const response = await fetch(
      process.env.SUPABASE_URL + '/functions/v1/create-order',
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
}

export default new OrderService()
