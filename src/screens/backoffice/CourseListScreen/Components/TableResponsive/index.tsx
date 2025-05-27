import React from 'react'

import Table from '@components/Table'
import TableCard from '@components/TableCard'
import TableCardPagination from '@components/TableCardPagination'
import TablePagination from '@components/TablePagination'
import {useResponsiveScreen} from '@hooks/CommonHooks'

import {Props} from './types'

export default function TableResponsive({
  headers,
  data,
  isLoading,
  onRowPress,
  current,
  last,
  onPaginatePress,
}: Props) {
  const {responsive} = useResponsiveScreen()

  if (responsive === 'MOBILE') {
    return (
      <>
        <TableCard
          headers={headers}
          data={data}
          isLoading={isLoading}
          onRowPress={onRowPress}
          containerStyle={{marginTop: 20}}
        />
        <TableCardPagination
          current={current}
          last={last}
          onPress={onPaginatePress}
        />
      </>
    )
  }
  return (
    <>
      <Table
        headers={headers}
        data={data}
        isLoading={isLoading}
        onRowPress={onRowPress}
        containerStyle={{marginTop: 20}}
      />
      <TablePagination
        current={current}
        last={last}
        onPress={onPaginatePress}
      />
    </>
  )
}
