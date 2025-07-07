import {
  OMISE_SECRET_KEY,
  PaymentMethod,
  PaymentMethodSourceMapping,
} from '@functions/_shared/payments.ts'
import {supabase} from '@functions/_shared/supabase.ts'
import {errorResponse, jsonResponse} from '@functions/_shared/utils.ts'
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

Deno.serve(async (req: Request): Promise<Response> => {
  const {courseId, userId, amount, paymentMethod, token, returnUri} =
    await req.json()
  const isPaymentConditionInvalid =
    paymentMethod == PaymentMethod.CREDIT_CARD && !token

  if (
    !courseId ||
    !userId ||
    !amount ||
    !paymentMethod ||
    isPaymentConditionInvalid
  ) {
    return errorResponse('Invalid parameter.')
  }

  try {
    const order = await createOrder(courseId, userId, amount)
    const chargeRequestBody = createChargeRequestBody(
      amount,
      paymentMethod,
      token,
      returnUri,
    )
    const chargeResponse = await createChargeOmise(chargeRequestBody)
    await createCharge(chargeResponse, order[0].id, userId, paymentMethod)
    const chargeHistoryError = await createChargeHistory(
      chargeRequestBody,
      chargeResponse,
    )
    if (chargeResponse.object == 'error') {
      throw new Error(chargeResponse.message)
    }
    if (chargeResponse.failure_message) {
      throw new Error(chargeResponse.failure_message)
    }
    if (chargeHistoryError) {
      throw chargeHistoryError
    }

    return jsonResponse({
      id: chargeResponse.id,
      amount: chargeResponse.amount,
      net: chargeResponse.net,
      fee: chargeResponse.fee,
      fee_vat: chargeResponse.fee_vat,
      qr_code_image:
        chargeResponse.source?.scannable_code?.image?.download_uri ?? null,
      authorize_uri: chargeResponse.authorize_uri,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(error.message, 500)
    }
    return errorResponse('Unknown error', 500)
  }
})

async function createOrder(courseId: number, userId: string, amount: number) {
  const {data, error} = await supabase.service
    .from('orders')
    .insert({
      user_id: userId,
      course_id: courseId,
      status: 'created',
      amount: amount,
    })
    .select()
  if (error) throw error

  return data
}

async function createCharge(
  chargeOmise: any,
  orderId: number,
  userId: string,
  paymentMethod: PaymentMethod,
) {
  const {error} = await supabase.service.from('charges').insert({
    id: chargeOmise.id,
    order_id: orderId,
    user_id: userId,
    payment_method: paymentMethod,
    amount: chargeOmise.amount,
    net: chargeOmise.net,
    fee: chargeOmise.fee,
    fee_vat: chargeOmise.fee_vat,
    status: chargeOmise.status,
  })
  if (error) throw error
}

function createChargeRequestBody(
  amount: number,
  paymentMethod: PaymentMethod,
  token?: string,
  returnUri?: string,
) {
  const paymentType = PaymentMethodSourceMapping[paymentMethod]

  switch (paymentMethod) {
    case PaymentMethod.QR_PROMPTPAY:
      return {
        amount: amount,
        currency: 'thb',
        'source[type]': paymentType,
        'source[qr_settings][image_type]': 'png',
        ...(returnUri ? {return_uri: returnUri} : {}),
      }
    case PaymentMethod.CREDIT_CARD:
      return {
        amount: amount,
        currency: 'thb',
        card: token,
        ...(returnUri ? {return_uri: returnUri} : {}),
      }
    case PaymentMethod.K_PLUS:
    case PaymentMethod.SCB_EASY:
    case PaymentMethod.BUALUANG:
    case PaymentMethod.KRUNGTHAI_NEXT:
    case PaymentMethod.KRUNGSRI:
      return {
        amount: amount,
        currency: 'thb',
        'source[type]': paymentType,
        ...(returnUri ? {return_uri: returnUri} : {}),
      }

    default:
      return null
  }
}

async function createChargeOmise(requestBody: any) {
  const response = await fetch('https://api.omise.co/charges', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`${OMISE_SECRET_KEY}:`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(requestBody).toString(),
  })

  return await response.json()
}

async function createChargeHistory(request: any, response: any) {
  const {error} = await supabase.service.from('charge_histories').insert({
    charge_id: response.id ?? 'charge_error',
    request_body: request,
    response: response,
  })
  return error
}
