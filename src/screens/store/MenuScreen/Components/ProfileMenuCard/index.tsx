import React from 'react'
import {Image, Text, View} from 'react-native'
import {Surface, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function ProfileMenuCard({name, email, containerStyle}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <Surface style={[styles.container, containerStyle]}>
      <TouchableRipple
        onPress={() => {}}
        style={styles.content}
        rippleColor='rgba(255, 255, 255, 0.1)'>
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require('@assets/images/avatar-icon.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.detail}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>
              {name}
            </Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.email}>
              Email : {email}
            </Text>
          </View>
        </>
      </TouchableRipple>
    </Surface>
  )
}
