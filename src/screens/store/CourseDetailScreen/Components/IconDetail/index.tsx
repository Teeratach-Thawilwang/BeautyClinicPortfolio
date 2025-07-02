import React from 'react'
import {Text, View} from 'react-native'
import {Icon} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function IconDetail({round, duration, price}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.detailItemContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.iconRound}>
            <Icon source='pound' size={20} color={theme.colors.surface} />
          </View>
        </View>
        <Text style={styles.text}>{round}</Text>
        <Text style={styles.note}>Appointment</Text>
      </View>
      <View style={styles.detailItemContainer}>
        <View style={styles.iconContainer}>
          <Icon
            source='fa-stopwatch'
            size={25}
            color={theme.colors.onSurface}
          />
        </View>
        <Text style={styles.text}>{duration}</Text>
        <Text style={styles.note}>Duration</Text>
      </View>
      <View style={styles.detailItemContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.iconPrice}>
            <Icon
              source='fa-baht-sign'
              size={20}
              color={theme.colors.surface}
            />
          </View>
        </View>
        <Text style={styles.text}>{price}</Text>
        <Text style={styles.note}>Price</Text>
      </View>
    </View>
  )
}
