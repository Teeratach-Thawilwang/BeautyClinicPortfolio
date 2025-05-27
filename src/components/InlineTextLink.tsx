import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, MD3Theme, Text} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

type InlineTextLinkProps = {
  text: string
  linkText: string
  onPress: (() => void) | (() => Promise<void>)
}

export default function InlineTextLink({
  text,
  linkText,
  onPress,
}: InlineTextLinkProps) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.container}>
      <Text variant='titleMedium' style={styles.text}>
        {text}
      </Text>
      <Button labelStyle={styles.label} mode='text' onPress={onPress}>
        {linkText}
      </Button>
    </View>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme.colors.onSurfaceVariant,
      flexShrink: 1,
      fontWeight: 'light',
    },
    label: {
      padding: 0,
      marginHorizontal: 0,
      color: theme.colors.primary,
      fontSize: theme.fonts.titleMedium.fontSize,
    },
  })
}
