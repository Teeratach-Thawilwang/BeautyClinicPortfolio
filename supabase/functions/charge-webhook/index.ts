import {OMISE_SECRET_KEY} from '@functions/_shared/payments.ts'
import {supabase} from '@functions/_shared/supabase.ts'
import {errorResponse, jsonResponse} from '@functions/_shared/utils.ts'
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

Deno.serve(async (req: Request): Promise<Response> => {
  const body = await req.json()

  if (
    !body ||
    body.object !== 'event' ||
    !body.data ||
    !body.data.object ||
    !body.key
  ) {
    return jsonResponse(null)
  }

  try {
    const chargeId = body.data.id
    const chargeDB = await getChargeDB(chargeId)

    const chargeOmise = await getChargeOmise(chargeId)
    await updateStatus('charges', chargeOmise.status, chargeId)

    if (chargeOmise.status == 'successful' && chargeOmise.paid) {
      await updateStatus('orders', 'ongoing', chargeDB.order_id)
      await createCustomerCourseIfNotExist(
        chargeDB.user_id,
        chargeDB.order_id,
        chargeDB.orders.courses,
      )
    }

    return jsonResponse('ok')
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(error.message, 500)
    }
    return errorResponse('Unknown error', 500)
  }
})

async function getChargeDB(id: string) {
  const {data, error: findError} = await supabase.service
    .from('charges')
    .select(
      `
        *,
        orders (
          course_id,
          courses (
            id,
            treatment_rounds
          )
        )
      `,
    )
    .eq('id', id)
    .single()

  if (findError || !data) {
    throw findError
  }

  return data
}

async function getChargeOmise(id: string) {
  const response = await fetch(`https://api.omise.co/charges/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + btoa(`${OMISE_SECRET_KEY}:`),
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Internal server error.')
  }

  return await response.json()
}

async function updateStatus(tableName: string, status: string, id: string) {
  const {error} = await supabase.service
    .from(tableName)
    .update({
      status: status,
    })
    .eq('id', id)

  if (error) {
    console.log('updateStatus error', error)
    throw error
  }
}

async function createCustomerCourseIfNotExist(
  userId: string,
  orderId: number,
  course: any,
) {
  const {data, error: findError} = await supabase.service
    .from('customer_courses')
    .select('id')
    .eq('user_id', userId)
    .eq('order_id', orderId)

  if (findError) {
    console.log('check customer-course exist error', findError)
    throw findError
  }
  if (data.length > 0) return

  const {error} = await supabase.service.from('customer_courses').insert({
    user_id: userId,
    order_id: orderId,
    course_id: course.id,
    quota_round: course.treatment_rounds,
    used_round: 0,
  })
  if (error) throw error
  if (error) {
    console.log('insert customer-course error', error)
    throw error
  }
}
