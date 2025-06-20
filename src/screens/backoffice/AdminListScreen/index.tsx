import React, {useCallback, useRef, useState} from 'react'
import {Keyboard, RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import ConfirmModal from '@components/ConfirmModal'
import TableResponsive from '@components/TableResponsive'
import {useTheme} from '@context-providers/ThemeProvider'
import {useRefresh} from '@hooks/CommonHooks'
import {
  useAdminDeleteMutation,
  useQueryAdminList,
} from '@hooks/backoffice/AdminHooks'
import {Admin} from '@models/backoffice/AdminTypes'

import Filter from './Components/Filter'
import {getStyles} from './styles'

export default function AdminListScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('DESC')
  const [startCreatedAt, setStartCreatedAt] = useState<Date | undefined>(
    undefined,
  )
  const [stopCreatedAt, setStopCreatedAt] = useState<Date | undefined>(
    undefined,
  )

  const [visible, setVisible] = useState(false)
  const deleteRef = useRef<Admin | null>(null)

  const {
    data: admins,
    isFetching: isLoading,
    refetch,
  } = useQueryAdminList(search, page, orderBy, startCreatedAt, stopCreatedAt)

  const {mutateAsync: deleteMutate} = useAdminDeleteMutation(refetch)

  const {refreshing, onRefresh} = useRefresh(() => {
    setSearch('')
    setPage(1)
    setOrderBy('DESC')
    setStartCreatedAt(undefined)
    setStopCreatedAt(undefined)
    refetch()
  })

  const onChangeFilter = useCallback((type: string, value: any) => {
    switch (type) {
      case 'Search':
        setSearch(value)
        setPage(1)
        break
      case 'OrderBy':
        setOrderBy(value)
        setPage(1)
        break
      case 'StartCreatedAt':
        setStartCreatedAt(value)
        setPage(1)
        break
      case 'StopCreatedAt':
        setStopCreatedAt(value)
        setPage(1)
        break
      case 'SetRangeCreatedAt':
        setStartCreatedAt(value.startCreatedAt)
        setStopCreatedAt(value.stopCreatedAt)
        setPage(1)
        break
      case 'SetAll':
        setOrderBy(value.orderBy)
        setStartCreatedAt(value.startCreatedAt)
        setStopCreatedAt(value.stopCreatedAt)
        setPage(1)
        break
    }
  }, [])

  const tableHeaders = ['ID', 'Email', 'Display name', 'Created at']
  const searchEmpty = search.length != 0
  const adminNotEmpty = admins?.data.length != 0

  if (!isLoading && searchEmpty && adminNotEmpty) Keyboard.dismiss()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Filter
        refreshing={refreshing}
        initialOrderBy={orderBy}
        initialStartCreatedAt={startCreatedAt}
        initialStopCreatedAt={stopCreatedAt}
        onChange={onChangeFilter}
      />
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <TableResponsive
            headers={tableHeaders}
            data={admins.data}
            isLoading={isLoading}
            onRowPress={row => {
              deleteRef.current = row
              setVisible(true)
            }}
            current={page}
            last={admins.last}
            onPaginatePress={page => setPage(page)}
          />
          <ConfirmModal
            isVisible={visible}
            title='Do you want to delete this admin ?'
            text={`${deleteRef.current?.email} will be deleted.`}
            onConfirm={async () => {
              if (deleteRef.current) {
                await deleteMutate(deleteRef.current.id)
              }
              setVisible(false)
              deleteRef.current = null
            }}
            onDismiss={() => setVisible(false)}
          />
        </>
      )}
    </ScrollView>
  )
}
