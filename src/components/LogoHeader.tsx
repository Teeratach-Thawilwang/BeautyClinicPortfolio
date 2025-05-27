import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {IconButton, MD3Theme, Text} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

export default function LogoHeader({allowBack = true}: {allowBack?: boolean}) {
  const {theme} = useTheme()
  const styles = getStyles(theme, allowBack)
  const navigation = useNavigate()

  return (
    <View style={styles.container}>
      {allowBack ? (
        <IconButton
          icon='keyboard-backspace'
          iconColor={theme.colors.onSurface}
          size={25}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
      ) : null}
      <View style={styles.imageContainer}>
        <Image source={require('@assets/logo.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text variant='titleMedium' style={styles.textLeft}>
          Beauty
        </Text>
        <Text variant='titleMedium' style={styles.textRight}>
          Clinic
        </Text>
      </View>
    </View>
  )
}

function getStyles(theme: MD3Theme, allowBack: boolean) {
  return StyleSheet.create({
    container: {
      marginTop: allowBack ? 5 : 30,
      marginBottom: 30,
      backgroundColor: theme.colors.background,
      position: 'relative',
    },
    backIcon: {
      top: 0,
      left: -18,
    },
    imageContainer: {
      width: 115,
      height: 115,
      borderRadius: 100,
      backgroundColor: '#81f8d0',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    image: {
      width: 80,
      height: 80,
    },
    textContainer: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    textLeft: {
      color: theme.colors.outline,
    },
    textRight: {
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
  })
}
