import {supabase} from '@functions/_shared/supabase.ts'
import {errorResponse, jsonResponse} from '@functions/_shared/utils.ts'
import type {User} from '@supabase/supabase-js'
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

Deno.serve(async (req: Request): Promise<Response> => {
  const {email} = await req.json()

  if (!email) return errorResponse('email param does not exist.')

  const {data, error: errorList} = await supabase.service.auth.admin.listUsers()
  if (errorList) return errorResponse(errorList.message, 404)

  const users = data.users.filter((user: User) => user.email === email)
  if (users.length == 0) return errorResponse('User not found', 404)

  const uuid = users[0].id

  const {error} = await supabase.service.from('admins').insert({user_id: uuid})

  if (error) {
    return errorResponse('This user is already an admin.', 404)
  }

  return jsonResponse(null)
})
