import React, {useRef, useState} from 'react'
import {StyleSheet} from 'react-native'
import {IconButton, Menu, Text, TouchableRipple} from 'react-native-paper'

import SingleDateTimePicker from '@components/SingleDateTimePicker'
import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'
import {getDeviceTimezone} from '@utils/Helpers'

export default function DropdownTimePicker({
  onChange,
  placeholder,
  width = 200,
  containerStyle,
  contentContainerStyle,
  placeholderStyle,
  placeholderIconColor,
}: {
  placeholder: string
  onChange: (date: Date) => void
  width?: number
  containerStyle?: any
  contentContainerStyle?: any
  placeholderStyle?: any
  placeholderIconColor?: any
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme, width)
  const [visible, setVisible] = useState(false)
  const [_, setRefresh] = useState(false)
  const timeRef = useRef<string | null>(null)
  const dateRef = useRef<Date>(new Date())

  return (
    <Menu
      elevation={0}
      contentStyle={{...styles.contentContainer, ...contentContainerStyle}}
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchorPosition='bottom'
      anchor={
        <TouchableRipple
          style={{...styles.container, ...containerStyle}}
          onPress={() => setVisible(val => !val)}>
          <>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{...styles.placeholder, ...placeholderStyle}}>
              {timeRef.current ? `Time (${timeRef.current})` : placeholder}
            </Text>
            <IconButton
              style={styles.iconButton}
              icon={timeRef.current ? 'close' : 'clock-time-eight-outline'}
              size={20}
              iconColor={placeholderIconColor ?? theme.colors.onSurfaceVariant}
              onPress={() => {
                timeRef.current = null
                dateRef.current = new Date()
                setRefresh(val => !val)
              }}
            />
          </>
        </TouchableRipple>
      }>
      <SingleDateTimePicker
        mode='time'
        initialDate={dateRef.current}
        onChange={date => {
          timeRef.current = date.toLocaleTimeString('en-En', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: getDeviceTimezone(),
          })
          dateRef.current = date
          onChange(date)
        }}
      />
    </Menu>
  )
}

function getStyles(theme: AdaptiveMD3Theme, width: number) {
  return StyleSheet.create({
    container: {
      width: width,
      marginVertical: 20,
      paddingVertical: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentContainer: {
      marginTop: -10,
      maxHeight: 200,
      minWidth: width,
      maxWidth: 2 * width,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    placeholder: {
      color: theme.colors.onSurface,
      fontSize: theme.fonts.bodyLarge.fontSize,
    },
    iconButton: {
      width: 20,
      height: 20,
      margin: 0,
    },
  })
}
