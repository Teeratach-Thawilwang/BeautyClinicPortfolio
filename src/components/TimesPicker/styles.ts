import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      width: '100%',
      gap: 5,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    timeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: 10,
    },
    timeBox: {
      paddingHorizontal: 10,
      height: 40,
      borderRadius: 5,
      backgroundColor: theme.colors.surfaceContainerHigh,

      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    timeLabel: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
      fontWeight: '500',
      textAlign: 'center',
    },
    removeIcon: {
      width: 16,
      height: 16,
      color: theme.colors.onSurface,
    },
    button: {
      width: 120,
    },
    modalCard: {
      width: 320,
      alignSelf: 'center',
      overflow: 'hidden',
    },
    timeRangeContainer: {
      width: '100%',
    },
  })
}
