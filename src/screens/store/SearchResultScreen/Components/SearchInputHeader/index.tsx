import React from 'react'
import {View} from 'react-native'
import {IconButton} from 'react-native-paper'

import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function SearchInputHeader({value, onSubmit}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  return (
    <View style={styles.container}>
      <IconButton
        icon='keyboard-backspace'
        iconColor={theme.colors.onSurface}
        size={25}
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
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
