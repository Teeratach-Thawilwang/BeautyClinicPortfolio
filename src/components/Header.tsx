import React from 'react'
import {StyleSheet, View} from 'react-native'
import {IconButton, MD3Theme, Text} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

export default function Header({
  name,
  allowBack = true,
}: {
  name: string
  allowBack?: boolean
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  return (
    <View style={styles.container}>
      {allowBack ? (
        <IconButton
          icon='ion-chevron-back'
          iconColor={theme.colors.onSurface}
          size={20}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
      ) : null}
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 10,
      marginBottom: 20,
      position: 'relative',
    },
    backIcon: {
      margin: 0,
      height: 40,
      width: 40,
      top: 0,
      left: -18,
      position: 'absolute',
    },
    text: {
      height: 40,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      fontSize: theme.fonts.titleMedium.fontSize,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  })
}
