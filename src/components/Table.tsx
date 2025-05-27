import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Surface, Text, TouchableRipple} from 'react-native-paper'

import Skeleton from '@components/Skeleton'
import {useTheme} from '@context-providers/ThemeProvider'
import {useSkeleton} from '@hooks/useSkeleton'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

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
}: {
  headers: string[]
  data: T[]
  onRowPress?: (row: T) => void
  isLoading?: boolean
  containerStyle?: any
  headerStyle?: any
  headerCellStyle?: any
  rowStyle?: any
  rowCellStyle?: any
  skeletonColor?: string
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const skeletonHooks = useSkeleton(
    skeletonColor ?? theme.colors.surfaceContainerHigh,
  )

  return (
    <Surface style={{...styles.container, ...containerStyle}}>
      <View style={{...styles.header, ...headerStyle}}>
        {headers.map((item, index) => {
          return (
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              key={'header-item-' + index}
              style={{...styles.headerCell, ...headerCellStyle}}>
              {item}
            </Text>
          )
        })}
      </View>

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
            <Skeleton
              skeletonHooks={skeletonHooks}
              useView={!isLoading}
              style={styles.skeleton}>
              {(Object.values(item) as string[]).map(
                (text: string, cellIndex: number) => {
                  return (
                    <Text
                      key={`row-${index}-cell-${cellIndex}`}
                      style={{...styles.rowCell, ...rowCellStyle}}>
                      {text}
                    </Text>
                  )
                },
              )}
            </Skeleton>
          </TouchableRipple>
        )
      })}
    </Surface>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      overflow: 'hidden',
    },
    header: {
      padding: 10,
      height: 50,
      backgroundColor: theme.colors.surfaceContainerHigh,
      gap: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerCell: {
      fontSize: theme.fonts.titleMedium.fontSize,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
    row: {
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderColor: theme.colors.surfaceVariant,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowLastChild: {
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
    },
    skeleton: {
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowCell: {
      color: theme.colors.onSurface,
      fontSize: theme.fonts.titleSmall.fontSize,
      textAlign: 'center',
      flex: 1,
    },
  })
}
