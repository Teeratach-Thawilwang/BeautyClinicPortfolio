import React from 'react'
import {View} from 'react-native'
import {Surface, Text, TouchableRipple} from 'react-native-paper'

import Skeleton from '@components/Skeleton'
import {useTheme} from '@context-providers/ThemeProvider'
import {useSkeleton} from '@hooks/SkeletonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function Table<T extends object>({
  headers,
  data,
  onRowPress,
  isLoading,
  containerStyle,
  headerStyle,
  headerCellStyle,
  rowStyle,
  rowCellStyle,
  skeletonColor,
}: Props<T>) {
  const {theme} = useTheme()
  const styles = getStyles(theme, isLoading)
  const skeletonHooks = useSkeleton(
    skeletonColor ?? theme.colors.surfaceContainerHigh,
  )

  return (
    <Surface style={{...styles.container, ...containerStyle}}>
      <View style={{...styles.header, ...headerStyle}}>
        {headers.map((item, index) => {
          return (
            <Text
              key={'header-item-' + index}
              style={{...styles.headerCell, ...headerCellStyle}}
              numberOfLines={1}
              ellipsizeMode='tail'>
              {item}
            </Text>
          )
        })}
      </View>

      <Skeleton skeletonHooks={skeletonHooks} isLoading={isLoading}>
        {data.map((item, index) => {
          const isLastChild = index == data.length - 1
          return (
            <TouchableRipple
              key={'row-' + index}
              style={
                isLastChild
                  ? {...styles.rowLastChild, ...rowStyle}
                  : {...styles.row, ...rowStyle}
              }
              onPress={() => {
                if (onRowPress) {
                  onRowPress(item)
                }
              }}>
              <>
                {(Object.values(item) as string[]).map(
                  (text: string, cellIndex: number) => {
                    return (
                      <Text
                        key={`row-${index}-cell-${cellIndex}`}
                        style={{...styles.rowCell, ...rowCellStyle}}
                        numberOfLines={1}
                        ellipsizeMode='tail'>
                        {text}
                      </Text>
                    )
                  },
                )}
              </>
            </TouchableRipple>
          )
        })}
      </Skeleton>
    </Surface>
  )
}
