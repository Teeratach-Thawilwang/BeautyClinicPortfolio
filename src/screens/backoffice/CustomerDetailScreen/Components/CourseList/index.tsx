import React, {useCallback, useState} from 'react'
import {Text, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import FlexBox from '@components/FlexBox'
import TableCardPagination from '@components/TableCardPagination'
import TablePagination from '@components/TablePagination'
import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'
import {useQueryCustomerCourseList} from '@hooks/backoffice/CustomerCourseHooks'

import CourseItem from '../CourseItem'
import Filter from '../Filter'
import {getStyles} from './styles'
import {Props} from './types'

export default function CourseList({customerId}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {responsive} = useResponsiveScreen()

  const [page, setPage] = useState(1)
  const [status, setStatus] = useState(undefined)
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('DESC')
  const [startCreatedAt, setStartCreatedAt] = useState<Date | undefined>(
    undefined,
  )
  const [stopCreatedAt, setStopCreatedAt] = useState<Date | undefined>(
    undefined,
  )

  const {data: courses, isFetching: isLoading} = useQueryCustomerCourseList(
    customerId,
    page,
    orderBy,
    status,
    startCreatedAt,
    stopCreatedAt,
  )

  const onChangeFilter = useCallback((type: string, value: any) => {
    switch (type) {
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

  if (isLoading) {
    return (
      <View style={styles.skeletonContainer}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlexBox
        mobileColumns={[1, 1]}
        tabletColumns={[1]}
        rowStyle={styles.flexBox}>
        <Text style={styles.title}>Purchased Courses</Text>
        <Filter
          initialStatus={status}
          initialOrderBy={orderBy}
          initialStartCreatedAt={startCreatedAt}
          initialStopCreatedAt={stopCreatedAt}
          onChange={onChangeFilter}
        />
      </FlexBox>
      <View style={styles.marginTop}>
        {courses.data.map((course, index) => {
          return (
            <CourseItem key={`purchased-course-${index}`} course={course} />
          )
        })}
      </View>
      {courses.data.length == 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noData}>No Data</Text>
        </View>
      ) : null}
      <View style={styles.paginateContainer}>
        {responsive === 'MOBILE' ? (
          <TableCardPagination
            current={page}
            last={courses.last}
            onPress={page => setPage(page)}
            containerStyle={styles.paginate}
          />
        ) : (
          <TablePagination
            current={page}
            last={courses.last}
            onPress={page => setPage(page)}
            containerStyle={styles.paginate}
          />
        )}
      </View>
    </View>
  )
}
