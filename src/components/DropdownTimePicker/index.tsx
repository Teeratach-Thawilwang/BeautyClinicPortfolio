import React, {useRef, useState} from 'react'
import {IconButton, Menu, Text, TouchableRipple} from 'react-native-paper'

import SingleDateTimePicker from '@components/SingleDateTimePicker'
import {useTheme} from '@context-providers/ThemeProvider'
import {getDeviceTimezone} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

export default function DropdownTimePicker({
  onChange,
  placeholder,
  width = 200,
  containerStyle,
  contentContainerStyle,
  placeholderStyle,
  placeholderIconColor,
}: Props) {
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
