import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Divider, MD3Theme, Text} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

export default function TextDivider({text}: {text: string}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.container}>
      <Divider testID='left-divider' style={styles.devider} />
      <Text variant='titleMedium' style={styles.text}>
        {text}
      </Text>
      <Divider testID='right-divider' style={styles.devider} />
    </View>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      height: 50,
      marginVertical: 5,
      backgroundColor: theme.colors.background,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginHorizontal: 20,
      color: theme.colors.onSurfaceVariant,
    },
    devider: {
      height: 1.5,
      flex: 1,
      borderColor: theme.colors.onSurface,
    },
  })
}
