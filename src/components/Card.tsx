import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Divider, MD3Theme, Surface} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

export default function Card({
  children,
  useDevider = true,
  style = {},
}: {
  children: ReactNode
  useDevider?: boolean
  style?: any
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const childArray = React.Children.toArray(children)

  return (
    <Surface style={{...styles.container, ...style}}>
      {useDevider
        ? childArray.map((item, index) => {
            const isNotLastIndex = index != childArray.length - 1
            return (
              <View key={index}>
                {item}
                {isNotLastIndex ? (
                  <Divider bold style={styles.devider} />
                ) : null}
              </View>
            )
          })
        : childArray}
    </Surface>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      overflow: 'hidden',
    },
    devider: {
      borderColor: theme.colors.outlineVariant,
    },
  })
}
