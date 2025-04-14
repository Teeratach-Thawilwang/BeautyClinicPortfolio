import React from 'react'
import {StyleSheet} from 'react-native'
import {TextInput} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useDebounce, useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

export default function SearchBar({
  placeHolder,
  onSearch,
  iconSize,
  style,
}: {
  placeHolder: string
  onSearch: (text: string) => void
  iconSize?: number
  style?: any
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [text, setText] = useDebounce<string>('', onSearch)

  return (
    <TextInput
      testID='search-input'
      mode='outlined'
      placeholder={placeHolder}
      value={text}
      style={[styles.style, style]}
      contentStyle={styles.content}
      outlineStyle={{
        borderRadius: style?.borderRadius ?? 10,
      }}
      outlineColor={theme.colors.surfaceVariant}
      activeOutlineColor={style?.borderColor ?? theme.colors.primary}
      left={<TextInput.Icon icon='ion-search' size={iconSize ?? 20} />}
      right={
        text.length > 0 ? (
          <TextInput.Icon
            icon='ion-close'
            size={iconSize ?? 20}
            onPress={() => setText('')}
          />
        ) : null
      }
      onChangeText={text => setText(text)}
    />
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  const {width, responsive} = useResponsiveScreen()
  return StyleSheet.create({
    style: {
      width: responsive == 'MOBILE' ? '100%' : width * 0.8 - 110 - 60,
      height: 45,
      fontSize: theme.fonts.bodyLarge.fontSize,
      backgroundColor: theme.colors.inverseOnSurface,
    },
    content: {
      marginLeft: 45,
      marginRight: 40,
      paddingVertical: 10,
    },
  })
}
