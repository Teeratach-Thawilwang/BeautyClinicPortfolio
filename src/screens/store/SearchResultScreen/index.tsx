import React, {useCallback, useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import CourseCardItem from '@components/CourseCardItem'
import FlexBox from '@components/FlexBox'
import TableCardPagination from '@components/TableCardPagination'
import {useTheme} from '@context-providers/ThemeProvider'
import {useRefresh} from '@hooks/CommonHooks'
import {useQueryCourseList} from '@hooks/store/SearchCourseHooks'
import {SearchResultScreenRouteProp} from '@navigation/AppNavigator'

import Filter from './Components/Filter'
import SearchInputHeader from './Components/SearchInputHeader'
import {getStyles} from './styles'

export default function SearchResultScreen({
  route,
}: {
  route: SearchResultScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  const [search, setSearch] = useState(route.params.q)
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('DESC')
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(40000)

  const {
    data: courses,
    isFetching: isLoading,
    refetch,
  } = useQueryCourseList(search, undefined, minPrice, maxPrice, page, orderBy)

  const {refreshing, onRefresh} = useRefresh(() => {
    setPage(1)
    setOrderBy('DESC')
    setMinPrice(0)
    setMaxPrice(40000)
    refetch()
  })

  const onChangeFilter = useCallback((value: any) => {
    setOrderBy(value.orderBy)
    setMinPrice(value.minPrice)
    setMaxPrice(value.maxPrice)
    setPage(1)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <SearchInputHeader
        value={search}
        onSubmit={value => {
          setSearch(value)
        }}
      />
      <Filter
        initialOrderBy={orderBy}
        initialMinPrice={minPrice}
        initialMaxPrice={maxPrice}
        searchCount={courses.total}
        onChange={onChangeFilter}
      />
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FlexBox
            isPadding={true}
            mobileColumns={[1]}
            tabletColumns={[1, 1]}
            containerStyle={{gap: 10}}
            rowStyle={{gap: 10}}>
            {courses.data.map((course, index) => {
              return (
                <CourseCardItem
                  key={index}
                  course={course}
                  isShowCategory={true}
                />
              )
            })}
          </FlexBox>
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
  )
}
