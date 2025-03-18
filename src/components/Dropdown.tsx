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
  width = 200,
  defaultValueByIndex = -1,
  containerStyle,
  contentContainerStyle,
  placeholderStyle,
  itemStyle,
  itemSelectedStlye,
  placeholderIconColor,
}: {
  data: DropdownItemProps[]
  placeholder: string
  onChange: (value: string) => void
  width?: number
  defaultValueByIndex?: number
  containerStyle?: any
  contentContainerStyle?: any
  placeholderStyle?: any
  itemStyle?: any
  itemSelectedStlye?: any
  placeholderIconColor?: any
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme, width)
  const [visible, setVisible] = useState(false)

  const initailIndex =
    defaultValueByIndex > data.length ? -1 : defaultValueByIndex
  const [indexSelected, setIndexSelected] = useState<number>(initailIndex)

  return (
    <Menu
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
              {indexSelected != -1 ? data[indexSelected].label : placeholder}
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
              indexSelected == index
                ? {...styles.itemSelected, ...itemSelectedStlye}
                : {...styles.item, ...itemStyle}
            }
            contentStyle={styles.itemContent}
            title={item.label}
            leadingIcon={item.icon}
            disabled={item.disabled}
            onPress={() => {
              onChange(item.value)
              setIndexSelected(index)
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
      height: 200,
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
