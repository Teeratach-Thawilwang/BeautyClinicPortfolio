import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import React, {ReactNode, useMemo} from 'react'
import {StyleSheet} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'
import {createArrayRange} from '@utils/Helpers'

function BottomSheet(
  {
    children,
    index,
    snapPoints,
    backgroundStyle,
    indicatorStyle,
    backdropStyle,
    containerStyle,
  }: {
    children: ReactNode
    index?: number | 'full'
    snapPoints?: string[] | number[]
    backgroundStyle?: any
    indicatorStyle?: any
    backdropStyle?: any
    containerStyle?: any
  },
  ref: React.Ref<BottomSheetModal>,
) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {indexUse, snapPointsUse} = useMemo(() => {
    const points =
      snapPoints ?? createArrayRange(20, 100, 10, true).map(i => `${i}%`)
    if (index) {
      if (index === 'full') {
        return {indexUse: points.length - 1, snapPointsUse: points}
      }
      if (index > -1 && index < points.length) {
        return {indexUse: index, snapPointsUse: points}
      }
    }
    return {indexUse: undefined, snapPointsUse: points}
  }, [index, snapPoints])

  return (
    <BottomSheetModal
      ref={ref}
      index={indexUse}
      snapPoints={snapPointsUse}
      enablePanDownToClose={true}
      backgroundStyle={{...styles.background, ...backgroundStyle}}
      onChange={index => {
        console.log('handleSheetChanges', index)
      }}
      handleIndicatorStyle={{...styles.indicator, ...indicatorStyle}}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          style={{...styles.backdrop, ...backdropStyle}}
        />
      )}>
      <BottomSheetScrollView style={{...styles.container, ...containerStyle}}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      paddingHorizontal: 20,
    },
    background: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    indicator: {
      backgroundColor: theme.colors.onSurfaceDisabled,
      width: 40,
    },
    backdrop: {backgroundColor: 'transparent'},
  })
}

export default React.forwardRef(BottomSheet)
