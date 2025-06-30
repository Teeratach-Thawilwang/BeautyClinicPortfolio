import React, {useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import TextInput from '@components/TextInput'
import WidgetBanner from '@components/WidgetBanner'
import WidgetCategory from '@components/WidgetCategory'
import WidgetCourse from '@components/WidgetCourse'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate, useRefresh} from '@hooks/CommonHooks'
import {useWidgetList} from '@hooks/store/WidgetHooks'

import {getStyles} from './styles'

export default function HomeScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [search, setSearch] = useState('')
  const navigation = useNavigate()

  const {data: widgets, isFetching: isLoading, refetch} = useWidgetList()
  const {refreshing, onRefresh} = useRefresh(() => {
    refetch()
  })

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <TextInput
            mode='outlined'
            icon='ion-search-outline'
            placeholder='ค้นหาคอร์ส...'
            value={search}
            containerStyle={styles.searchInput}
            onChange={value => setSearch(value)}
            onSubmit={value => {
              navigation.navigate('SearchResultScreen', {q: value})
              setSearch('')
            }}
          />
          {widgets?.map((widget, index) => {
            switch (widget.type) {
              case 'banner':
                return <WidgetBanner key={index} banners={widget.items} />
              case 'category':
                return <WidgetCategory key={index} banners={widget.items} />
              case 'course':
                return <WidgetCourse key={index} courses={widget.items} />
              default:
                return null
            }
          })}
        </>
      )}
    </ScrollView>
  )
}
