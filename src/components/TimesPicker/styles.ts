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
      height: 50,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.onSurfaceVariant,
      backgroundColor: theme.colors.onSurface,

      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    timeLabel: {
      color: theme.colors.surface,
      fontSize: theme.fontSize.body,
      fontWeight: '500',
      textAlign: 'center',
    },
    removeIcon: {
      width: 20,
      height: 20,
      color: theme.colors.surface,
    },
    button: {
      width: 120,
    },
    timePickerFlex: {
      flexDirection: 'row',
    },
    textSaparate: {
      width: 20,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    modal: {
      padding: 20,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
    },
    modalTitle: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.title,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalButtonFlex: {
      flexDirection: 'row',
      gap: 20,
    },
    modalErrorText: {
      color: theme.colors.error,
    },
  })
}
