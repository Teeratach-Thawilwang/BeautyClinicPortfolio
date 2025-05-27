import React, {useState} from 'react'
import {Keyboard, RefreshControl, ScrollView, StyleSheet} from 'react-native'

import CourseListFilter from '@components/CourseListFilter'
import ResponsiveSwitcher from '@components/ResponsiveSwitcher'
import Table from '@components/Table'
import TableCard from '@components/TableCard'
import TableCardPagination from '@components/TableCardPagination'
import TablePagination from '@components/TablePagination'
import {useTheme} from '@context-providers/ThemeProvider'
import {useCourses} from '@hooks/BackofficeCourseHook'
import {useNavigate, useRefresh} from '@hooks/CommonHooks'
import {CourseListItem} from '@models/CourseInterface'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

const tableHeaders = ['id', 'name', 'status', 'price', 'create at']

export default function CourseListScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState(undefined)
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('DESC')
  const [startCreatedAt, setStartCreatedAt] = useState(undefined)
  const [stopCreatedAt, setStopCreatedAt] = useState(undefined)
  const {
    data: courses,
    isFetching: isLoading,
    refetch,
  } = useCourses(search, page, orderBy, status, startCreatedAt, stopCreatedAt)
  const {refreshing, onRefresh} = useRefresh(() => {
    setSearch('')
    setPage(1)
    setStatus(undefined)
    setOrderBy('DESC')
    setStartCreatedAt(undefined)
    setStopCreatedAt(undefined)
    refetch()
  })

  const searchEmpty = search.length != 0
  const courseNotEmpty = courses?.data.length != 0
  if (!isLoading && searchEmpty && courseNotEmpty) Keyboard.dismiss()

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps='handled'
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <CourseListFilter
        status={status}
        orderBy={orderBy}
        onChange={(type, value) => {
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
          }
        }}
      />
      <ResponsiveSwitcher
        commonProps={{
          headers: tableHeaders,
          data: courses.data,
          isLoading: isLoading,
          onRowPress: row =>
            navigation.push('BackOfficeScreens', {
              screen: 'CourseDetail',
              params: {courseId: row.id},
            }),
          containerStyle: {marginTop: 20},
        }}
        mobile={TableCard<CourseListItem>}
        tablet={Table<CourseListItem>}
      />
      <ResponsiveSwitcher
        commonProps={{
          current: page,
          last: courses.last,
          onPress: page => setPage(page),
        }}
        mobile={TableCardPagination}
        tablet={TablePagination}
      />
    </ScrollView>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
  })
}
