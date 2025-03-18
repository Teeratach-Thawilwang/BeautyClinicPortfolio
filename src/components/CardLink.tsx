import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

export default function CardLink({
  children,
  icon,
  iconColor,
  containerStyle = {},
  textStyle = {},
  onPress = () => {},
}: {
  children: string
  icon?: string
  iconColor?: string
  containerStyle?: any
  textStyle?: any
  onPress?: () => void
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <TouchableRipple
      onPress={onPress}
      style={{...styles.container, ...containerStyle}}>
      <>
        {icon ? (
          <View style={styles.iconLeft}>
            <Icon
              source={icon}
              size={20}
              color={iconColor ?? theme.colors.primary}
            />
          </View>
        ) : null}
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{...styles.text, ...textStyle}}>
          {children}
        </Text>
        <Icon
          source='ion-chevron-forward'
          size={20}
          color={theme.colors.onSurfaceVariant}
        />
      </>
    </TouchableRipple>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingLeft: 20,
      paddingRight: 10,
      borderWidth: 0,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      flexGrow: 1,
      color: theme.colors.onSurface,
      fontSize: theme.fonts.titleMedium.fontSize,
    },
    iconLeft: {
      marginRight: 10,
    },
  })
}
