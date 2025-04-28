import {User} from '@supabase/supabase-js'

// State Interface
export type AuthSlice = {
  [key: string]: any
  isAdmin: boolean
  user: User | null
}
