import React from 'react'
import {Text, View} from 'react-native'

import FlexBox from '@components/FlexBox'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function CustomerInformation({customer}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information</Text>
      <FlexBox
        mobileColumns={[1]}
        tabletColumns={[1, 1]}
        rowStyle={styles.flexBox}>
        <TextInput
          mode='labelTop'
          label='ID'
          value={customer.id}
          onChange={_ => {}}
          containerStyle={styles.inputItem}
          disabled
        />
        <TextInput
          mode='labelTop'
          label='Email'
          value={customer.email}
          onChange={_ => {}}
          containerStyle={styles.inputItem}
          disabled
        />
        <TextInput
          mode='labelTop'
          label='Name'
          value={customer.display_name}
          onChange={_ => {}}
          containerStyle={styles.inputItem}
          disabled
        />
        <TextInput
          mode='labelTop'
          label='Created at'
          value={customer.created_at}
          onChange={_ => {}}
          containerStyle={styles.inputItem}
          disabled
        />
      </FlexBox>
    </View>
  )
}
