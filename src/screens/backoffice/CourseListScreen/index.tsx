import React, {useCallback, useState} from 'react'
import {Keyboard, RefreshControl, ScrollView} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate, useRefresh} from '@hooks/CommonHooks'
import {useQueryCourses} from '@hooks/backoffice/CourseHooks'

import Filter from './Components/Filter'
import TableResponsive from './Components/TableResponsive'
import {getStyles} from './styles'

export default function CourseListScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState(undefined)
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('DESC')
  const [startCreatedAt, setStartCreatedAt] = useState<Date | undefined>(
    undefined,
  )
  const [stopCreatedAt, setStopCreatedAt] = useState<Date | undefined>(
    undefined,
  )

  const {
    data: courses,
    isFetching: isLoading,
    refetch,
  } = useQueryCourses(
    search,
    page,
    orderBy,
    status,
    startCreatedAt,
    stopCreatedAt,
  )

  const {refreshing, onRefresh} = useRefresh(() => {
    setSearch('')
    setPage(1)
    setStatus(undefined)
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
      case 'Status':
        setStatus(value)
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
        setStatus(value.status)
        setOrderBy(value.orderBy)
        setStartCreatedAt(value.startCreatedAt)
        setStopCreatedAt(value.stopCreatedAt)
        setPage(1)
        break
    }
  }, [])

  const tableHeaders = ['id', 'name', 'status', 'price', 'created at']
  const searchEmpty = search.length != 0
  const courseNotEmpty = courses?.data.length != 0

  if (!isLoading && searchEmpty && courseNotEmpty) Keyboard.dismiss()

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Filter
        refreshing={refreshing}
        initialStatus={status}
        initialOrderBy={orderBy}
        initialStartCreatedAt={startCreatedAt}
        initialStopCreatedAt={stopCreatedAt}
        onChange={onChangeFilter}
      />
      <TableResponsive
        headers={tableHeaders}
        data={courses.data}
        isLoading={isLoading}
        onRowPress={row =>
          navigation.navigate('BackOfficeScreens', {
            screen: 'CourseDetail',
            params: {courseId: row.id},
          })
        }
        current={page}
        last={courses.last}
        onPaginatePress={page => setPage(page)}
      />
    </ScrollView>
  )
}
