import React, {useState} from 'react'
import {FlatList, RefreshControl, View} from 'react-native'
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
    setSearch('')
    refetch()
  })

  const renderItem = ({item}: {item: any}) => {
    switch (item.type) {
      case 'banner':
        return <WidgetBanner banners={item.items} />
      case 'category':
        return <WidgetCategory banners={item.items} />
      case 'course':
        return <WidgetCourse courses={item.items} />
      default:
        return null
    }
  }
  const keyExtractor = (item: any, index: number) => `${item.type}-${index}`

  const renderHeader = () => (
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
  )

  if (isLoading) {
    return (
      <View style={styles.skeletonContainer}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <FlatList
      data={widgets}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  )
}
