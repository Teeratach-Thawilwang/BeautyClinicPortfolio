import {User} from '@supabase/supabase-js'

// State Interface
export interface UserSliceInterface {
  [key: string]: any
  data: User | null
  isLoading: boolean
  error: string | null
}
