import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import React, {useMemo} from 'react'

import {useTheme} from '@context-providers/ThemeProvider'
import {createArrayRange} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

function BottomSheet(
  {
    children,
    index,
    snapPoints,
    backgroundStyle,
    indicatorStyle,
    backdropStyle,
    containerStyle,
  }: Props,
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
    return {indexUse: undefined, snapPointsUse: undefined}
  }, [index, snapPoints])

  return (
    <BottomSheetModal
      ref={ref}
      index={indexUse}
      snapPoints={snapPointsUse}
      enablePanDownToClose={true}
      backgroundStyle={[styles.background, backgroundStyle]}
      handleIndicatorStyle={[styles.indicator, indicatorStyle]}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          style={[styles.backdrop, backdropStyle]}
        />
      )}>
      <BottomSheetScrollView style={[styles.container, containerStyle]}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

export default React.forwardRef(BottomSheet)
