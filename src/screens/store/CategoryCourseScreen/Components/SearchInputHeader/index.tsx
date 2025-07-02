import React from 'react'
import {View} from 'react-native'

import HeaderBar from '@components/HeaderBar'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function SearchInputHeader({title, value, onSubmit}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <HeaderBar title={title} />
      <TextInput
        mode='outlined'
        value={value}
        onSubmit={onSubmit}
        icon='ion-search-outline'
        placeholder='ค้นหาคอร์ส...'
        clearText={true}
        containerStyle={styles.textInputContainer}
      />
    </View>
  )
}
