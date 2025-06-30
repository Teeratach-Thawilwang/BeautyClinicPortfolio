import React from 'react'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function SearchFilterBar({searchCount, onPress}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.searchCount}>{searchCount} founds</Text>
      <Button
        mode='text'
        containerStyle={styles.filterButtonContainer}
        labelStyle={styles.filterButtonLabel}
        iconStyle={styles.filterButtonIcon}
        onPress={onPress}
        icon='filter-variant'>
        Filter
      </Button>
    </View>
  )
}
