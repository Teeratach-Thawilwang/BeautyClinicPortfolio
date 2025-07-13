import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme, column: number) {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      flexGrow: 1,
    },
    skeletonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    timePickerContainer: {
      marginTop: 10,
      flexDirection: column == 1 ? 'column' : 'row',
      flexWrap: 'wrap',
      justifyContent: column == 1 ? 'flex-start' : 'space-around',
      alignSelf: 'center',
      gap: 10,
    },
    buttonTimeSlotContainer: {
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceContainerHighest,
    },
    buttonTimeSlotLabel: {
      color: theme.colors.onSurface,
    },
  })
}
