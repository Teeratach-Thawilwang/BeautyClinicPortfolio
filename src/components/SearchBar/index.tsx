import React from 'react'
import {TextInput} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useDebounce} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function SearchBar({
  placeholder,
  onSearch,
  iconSize,
  style,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [text, setText] = useDebounce<string>('', onSearch)

  return (
    <TextInput
      testID='search-input'
      mode='outlined'
      placeholder={placeholder}
      value={text}
      style={[styles.style, style]}
      contentStyle={styles.content}
      outlineStyle={{
        borderRadius: style?.borderRadius ?? 5,
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
