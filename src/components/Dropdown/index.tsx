import React, {useRef, useState} from 'react'
import {FlatList, View} from 'react-native'
import {Icon, Menu, Text, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function Dropdown({
  data,
  placeholder,
  onChange,
  multiple = false,
  defaultValueByIndex = [],
  width = 200,
  containerStyle,
  contentContainerStyle,
  placeholderStyle,
  itemStyle,
  itemSelectedStyle,
  placeholderIconColor,
}: Props) {
  const {theme} = useTheme()
  const anchorRef = useRef<View>(null)
  const widthRef = useRef<number>(width)
  anchorRef.current?.measure((_x, _y, width) => (widthRef.current = width))
  const styles = getStyles(theme, widthRef.current)
  const [visible, setVisible] = useState(false)

  const filterDefaultValues = defaultValueByIndex.filter(
    item => item < data.length && item >= 0,
  )
  const initialIndexes =
    filterDefaultValues.length > 0 ? filterDefaultValues : []
  const [indexesSelected, setIndexesSelected] =
    useState<number[]>(initialIndexes)

  return (
    <Menu
      elevation={0}
      contentStyle={{...styles.contentContainer, ...contentContainerStyle}}
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchorPosition='bottom'
      anchor={
        <TouchableRipple
          ref={anchorRef}
          style={{...styles.container, ...containerStyle}}
          onPress={() => setVisible(val => !val)}>
          <>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{...styles.placeholder, ...placeholderStyle}}>
              {indexesSelected.length == 0
                ? placeholder
                : multiple
                  ? `${placeholder} (${indexesSelected.length})`
                  : data[indexesSelected[0]].label}
            </Text>
            <Icon
              source={visible ? 'close' : 'chevron-down'}
              size={20}
              color={placeholderIconColor ?? theme.colors.onSurfaceVariant}
            />
          </>
        </TouchableRipple>
      }>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <Menu.Item
            style={
              indexesSelected.some(i => i == index)
                ? {...styles.itemSelected, ...itemSelectedStyle}
                : {...styles.item, ...itemStyle}
            }
            contentStyle={styles.itemContent}
            title={item.label}
            leadingIcon={item.icon}
            disabled={item.disabled}
            onPress={() => {
              setIndexesSelected(indexList => {
                if (indexList.includes(index)) {
                  if (multiple) {
                    const newList = indexList.filter(i => i != index)
                    onChange(newList.map(val => data[val].value))
                    return newList
                  }
                  onChange([])
                  return []
                } else {
                  if (multiple) {
                    const newList = [...indexList, index]
                    onChange(newList.map(val => data[val].value))
                    return newList
                  }
                  onChange([item.value])
                  return [index]
                }
              })
              setVisible(false)
            }}
          />
        )}
      />
    </Menu>
  )
}
