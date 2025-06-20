export type Customer = {
  id: string
  email: string
  display_name: string
  created_at: string
}

export type CustomerItem = {
  id: string
  email: string
  display_name: string
  created_at: string
}

export type CustomerList = {
  data: CustomerItem[]
  last: number
}
