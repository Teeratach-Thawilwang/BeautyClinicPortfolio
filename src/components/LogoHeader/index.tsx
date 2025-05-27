import React from 'react'
import {Image, Text, View} from 'react-native'
import {IconButton} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

import {getStyles} from './styles'

export default function LogoHeader({allowBack = true}: {allowBack?: boolean}) {
  const {theme} = useTheme()
  const styles = getStyles(theme, allowBack)
  const navigation = useNavigate()

  return (
    <View style={styles.container}>
      {allowBack ? (
        <IconButton
          icon='keyboard-backspace'
          iconColor={theme.colors.onSurface}
          size={25}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
      ) : null}
      <View style={styles.imageContainer}>
        <Image
          source={require('@assets/images/logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLeft}>Beauty</Text>
        <Text style={styles.textRight}>Clinic</Text>
      </View>
    </View>
  )
}
