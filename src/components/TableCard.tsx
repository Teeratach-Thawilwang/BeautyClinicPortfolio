import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'
import {Icon, Surface, Text, TouchableRipple} from 'react-native-paper'

import Skeleton from '@components/Skeleton'
import {useTheme} from '@context-providers/ThemeProvider'
import {useSkeleton} from '@hooks/useSkeleton'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

export default function TableCard<T extends object>({
  headers,
  data,
  onRowPress,
  isLoading,
  containerStyle,
  rowStyle,
  headerStyle,
  headerCellStyle,
  contentStyle,
  contentCellStyle,
  iconStyle,
  skeletonColor,
}: {
  headers: string[]
  data: T[]
  onRowPress?: (row: T) => void
  isLoading?: boolean
  containerStyle?: any
  rowStyle?: any
  headerStyle?: any
  headerCellStyle?: any
  contentStyle?: any
  contentCellStyle?: any
  iconStyle?: any
  skeletonColor?: string
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const skeletonHooks = useSkeleton(
    skeletonColor ?? theme.colors.surfaceContainerHigh,
  )

  if (data.length == 0) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.noData}>No Data</Text>
      </View>
    )
  }

  return (
    <Surface elevation={0} style={[styles.container, containerStyle]}>
      {data.map((item, rowIndex) => {
        const isLastChild = rowIndex == data.length - 1
        return (
          <TouchableRipple
            key={'row-' + rowIndex}
            style={
              isLastChild
                ? [styles.rowLastChild, rowStyle]
                : [styles.row, rowStyle]
            }
            onPress={() => {
              if (onRowPress) {
                onRowPress(item)
              }
            }}>
            <>
              <View style={[styles.header, headerStyle]}>
                {headers.map((text: string, itemIndex: number) => {
                  return (
                    <Text
                      key={'header-' + itemIndex}
                      style={[styles.headerCell, headerCellStyle]}>
                      {text}
                    </Text>
                  )
                })}
              </View>
              <Skeleton
                skeletonHooks={skeletonHooks}
                useView={!isLoading}
                style={{flexDirection: 'row', flexGrow: 1}}>
                <View style={[styles.content, contentStyle]}>
                  {(Object.values(item) as string[]).map(
                    (text: string, itemIndex: number) => {
                      return (
                        <Text
                          key={'content-' + itemIndex}
                          style={[styles.contentCell, contentCellStyle]}>
                          {text}
                        </Text>
                      )
                    },
                  )}
                </View>
                <View style={styles.iconContainer}>
                  <Icon
                    source='ion-chevron-forward'
                    size={iconStyle?.width ?? 20}
                    color={iconStyle?.color ?? theme.colors.surfaceVariant}
                  />
                </View>
              </Skeleton>
            </>
          </TouchableRipple>
        )
      })}
    </Surface>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  const row: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderColor: theme.colors.surfaceVariant,
    flexDirection: 'row',
    alignItems: 'flex-start',
  }

  return StyleSheet.create({
    container: {
      marginBottom: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      overflow: 'hidden',
    },
    noData: {
      height: 50,
      textAlign: 'center',
      lineHeight: 50,
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fonts.titleMedium.fontSize,
      fontWeight: 'bold',
    },
    row: {
      ...row,
    },
    rowLastChild: {
      ...row,
      borderBottomWidth: 0,
    },
    header: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: '100%',
      borderRightWidth: 1,
      borderRightColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      gap: 10,
    },
    headerCell: {
      fontSize: theme.fonts.titleSmall.fontSize,
      fontWeight: 'bold',
      textAlign: 'left',
      flex: 1,
    },
    content: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: '100%',
      gap: 10,
    },
    contentCell: {
      color: theme.colors.onSurface,
      fontSize: theme.fonts.titleSmall.fontSize,
      textAlign: 'left',
      flex: 1,
    },
    iconContainer: {
      paddingHorizontal: 5,
      marginLeft: 'auto',
      alignSelf: 'center',
    },
  })
}
