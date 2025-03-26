import React, {useState} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {Icon, Menu, Text, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

type DropdownItemProps = {
  label: string
  value: string
  icon?: string
  disabled?: boolean
}

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
}: {
  data: DropdownItemProps[]
  placeholder: string
  onChange: (value: string[]) => void
  multiple?: boolean
  defaultValueByIndex?: number[]
  width?: number
  containerStyle?: any
  contentContainerStyle?: any
  placeholderStyle?: any
  itemStyle?: any
  itemSelectedStyle?: any
  placeholderIconColor?: any
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme, width)
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

function getStyles(theme: AdaptiveMD3Theme, width: number) {
  return StyleSheet.create({
    container: {
      width: width,
      marginVertical: 20,
      paddingVertical: 10,
      paddingLeft: 20,
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
    item: {
      minWidth: width,
      maxWidth: 2 * width,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    itemSelected: {
      minWidth: width,
      maxWidth: 2 * width,
      backgroundColor: theme.colors.surfaceContainerLowest,
    },
    itemContent: {
      minWidth: width,
      maxWidth: 2 * width,
    },
  })
}
