export type Admin = {
  id: string
  email: string
  display_name: string
  created_at: string
}

export type AdminList = {
  data: Admin[]
  last: number
}

export type AdminForm = {
  email: string
}
