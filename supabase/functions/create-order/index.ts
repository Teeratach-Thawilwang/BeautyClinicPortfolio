import {supabase} from '@functions/_shared/supabase.ts'
import {errorResponse, jsonResponse} from '@functions/_shared/utils.ts'
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

Deno.serve(async (req: Request): Promise<Response> => {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse('Unauthorized', 401)
  }
  const accessToken = authHeader.replace('Bearer ', '')
  const {
    data: {user},
    error: userError,
  } = await supabase.service.auth.getUser(accessToken)
  if (userError) return errorResponse(userError.message, 500)

  const {courseId, stangAmount} = await req.json()
  const {data: order, error: orderError} = await supabase.service
    .from('orders')
    .insert({
      user_id: user.id,
      course_id: courseId,
      status: 'created',
      amount: stangAmount,
    })
    .select()
  if (orderError) return errorResponse(orderError.message, 500)

  return jsonResponse(order[0])
})
