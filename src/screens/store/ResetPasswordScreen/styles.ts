import {StyleSheet, useWindowDimensions} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {width, height} = useWindowDimensions()
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    containerLoading: {
      width: width - 40,
      height: height,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  })
}
