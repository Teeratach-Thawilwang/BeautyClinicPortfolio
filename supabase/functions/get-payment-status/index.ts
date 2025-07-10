import {supabase} from '@functions/_shared/supabase.ts'
import {errorResponse, jsonResponse} from '@functions/_shared/utils.ts'
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

Deno.serve(async (req: Request): Promise<Response> => {
  const {chargeId, userId} = await req.json()

  if (!chargeId || !userId) return errorResponse('Invalid parameter.')

  const {data, error} = await supabase.service
    .from('charges')
    .select('*')
    .eq('id', chargeId)
    .eq('user_id', userId)

  if (error) {
    return errorResponse(error.message, 400)
  }
  if (data.length == 0) {
    return errorResponse('Resource not found.', 400)
  }

  return jsonResponse(data[0].status)
})
