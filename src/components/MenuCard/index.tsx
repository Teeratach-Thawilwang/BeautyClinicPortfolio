import React from 'react'
import {View} from 'react-native'
import {Divider, Surface} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function MenuCard({
  children,
  useDivider = true,
  containerStyle,
  dividerStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const childArray = React.Children.toArray(children)

  return (
    <Surface style={[styles.container, containerStyle]}>
      {useDivider
        ? childArray.map((item, index) => {
            const isNotLastIndex = index != childArray.length - 1
            return (
              <View key={index}>
                {item}
                {isNotLastIndex ? (
                  <Divider bold style={[styles.devider, dividerStyle]} />
                ) : null}
              </View>
            )
          })
        : childArray}
    </Surface>
  )
}
