import React, {ReactNode} from 'react'
import {StyleSheet} from 'react-native'

import BottomSheet from '@components/BottomSheet'
import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'
import {createBottomSheetRef, useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

export default function FilterResponsive({
  children,
  indexBottomSheet,
  containerStyle,
  contentStyle,
  labelStyle,
  iconStyle,
}: {
  children: ReactNode
  indexBottomSheet?: number | 'full'
  containerStyle?: any
  contentStyle?: any
  labelStyle?: any
  iconStyle?: {width: number; color: string}
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {responsive} = useResponsiveScreen()
  const buttonSheetRef = createBottomSheetRef()

  if (responsive != 'MOBILE') {
    return <>{children}</>
  }

  return (
    <>
      <Button
        mode='outlined'
        containerStyle={[styles.container, containerStyle]}
        contentStyle={contentStyle}
        labelStyle={[styles.label, labelStyle]}
        iconStyle={iconStyle ?? {width: 20, color: theme.colors.onSurface}}
        onPress={() => {
          buttonSheetRef.current?.present()
        }}
        icon='filter-variant'>
        Filter
      </Button>
      <BottomSheet ref={buttonSheetRef} index={indexBottomSheet}>
        {children}
      </BottomSheet>
    </>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginLeft: 'auto',
      marginRight: 0,
      width: 100,
      borderRadius: 10,
      borderColor: theme.colors.onSurfaceVariant,
    },
    label: {
      color: theme.colors.onSurface,
    },
  })
}
