import React from 'react'
import {View} from 'react-native'
import {Icon, Surface, Text, TouchableRipple} from 'react-native-paper'

import Skeleton from '@components/Skeleton'
import {useTheme} from '@context-providers/ThemeProvider'
import {useSkeleton} from '@hooks/SkeletonHooks'

import {getStyles} from './styles'
import {Props} from './types'

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
}: Props<T>) {
  const {theme} = useTheme()
  const styles = getStyles(theme, isLoading)
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
      <Skeleton skeletonHooks={skeletonHooks} isLoading={isLoading}>
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
                {/* <Skeleton
                skeletonHooks={skeletonHooks}
                isLoading={isLoading}
                style={{flexDirection: 'row', flexGrow: 1}}> */}
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
                {/* </Skeleton> */}
              </>
            </TouchableRipple>
          )
        })}
      </Skeleton>
    </Surface>
  )
}
