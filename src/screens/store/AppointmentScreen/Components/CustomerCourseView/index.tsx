import React, {useCallback, useEffect, useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import TableCardPagination from '@components/TableCardPagination'
import {useTheme} from '@context-providers/ThemeProvider'
import {CustomerCourseStatus} from '@enums/StatusEnums'
import {useRefresh} from '@hooks/CommonHooks'
import {useQueryCustomerCourseList} from '@hooks/store/CustomerCourseHooks'
import AuthService from '@services/AuthService'

import GuestSignin from '../GuestSignin'
import CourseItem from './Components/CourseItem'
import Filter from './Components/Filter'
import {getStyles} from './styles'

export default function CustomerCourseView() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const isSignIn = AuthService.getIsSignIn()

  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<CustomerCourseStatus | undefined>(
    undefined,
  )
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('DESC')

  const {
    data: courses,
    isFetching: isLoading,
    refetch,
  } = useQueryCustomerCourseList(page, orderBy, status)

  const {refreshing, onRefresh} = useRefresh(() => {
    setPage(1)
    setStatus(undefined)
    setOrderBy('DESC')
    refetch()
  })

  const onChangeFilter = useCallback((value: any) => {
    setPage(1)
    setStatus(value.status)
    setOrderBy(value.orderBy)
  }, [])

  useEffect(() => {
    refetch()
  }, [isSignIn])

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isSignIn ? (
          <Filter
            initialStatus={status}
            initialOrderBy={orderBy}
            searchCount={courses.total}
            onChange={onChangeFilter}
          />
        ) : (
          <GuestSignin />
        )}
        {isLoading ? (
          <View style={styles.skeletonContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            {courses.data.map((course, index) => {
              return <CourseItem key={index} course={course} />
            })}
            {courses.data.length !== 0 ? (
              <TableCardPagination
                current={page}
                last={courses.last}
                onPress={page => {
                  setPage(page)
                }}
              />
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  )
}
