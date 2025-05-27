import {
  QueryClientProvider as Provider,
  QueryClient,
} from '@tanstack/react-query'
import React from 'react'

export const queryClient = new QueryClient()

export default function QueryClientProvider({
  children,
}: {
  children: JSX.Element
}) {
  return <Provider client={queryClient}>{children}</Provider>
}
