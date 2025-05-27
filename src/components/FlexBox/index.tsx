import React, {ReactNode} from 'react'
import {View} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function FlexBox({
  children,
  mobileColumns,
  tabletColumns,
  isPadding = false,
  containerStyle,
  rowStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {responsive} = useResponsiveScreen()
  const columns = responsive == 'MOBILE' ? mobileColumns : tabletColumns
  const totalFlex = columns.reduce((sum, val) => sum + val, 0)
  const childrenArray = transformChildren(children, columns.length, isPadding)
  const chunkChildren = chunkArray(childrenArray, columns.length)

  return (
    <View style={containerStyle}>
      {chunkChildren.map((chunk, groupIndex) => {
        return (
          <View
            key={`row-${groupIndex}`}
            style={[styles.row, {flex: totalFlex}, rowStyle]}>
            {chunk.map((node, index) => {
              return (
                <View
                  key={groupIndex * columns.length + index}
                  style={{flex: columns[index % columns.length]}}>
                  {node}
                </View>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

function transformChildren(
  children: ReactNode,
  columnLength: number,
  isPadding: boolean,
): ReactNode[] {
  const childrenArray = React.Children.toArray(children)
  if (!isPadding) return childrenArray
  const remainCount = childrenArray.length % columnLength
  const paddingCount = remainCount == 0 ? 0 : columnLength - remainCount
  return [...childrenArray, ...Array(paddingCount).fill(<View />)]
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}
