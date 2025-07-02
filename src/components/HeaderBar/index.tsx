import React from 'react'
import {Text, View} from 'react-native'
import {IconButton} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function HeaderBar({title, containerStyle}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  return (
    <View style={[styles.container, containerStyle]}>
      <IconButton
        icon='keyboard-backspace'
        iconColor={theme.colors.onSurface}
        size={25}
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  )
}
