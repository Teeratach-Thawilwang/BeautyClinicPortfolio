// @ts-ignore
import {createClient} from 'jsr:@supabase/supabase-js@2'

const service = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

const client = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!,
)

export const supabase = {
  service: service,
  client: client,
}
