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
    flexRow: {
      flexDirection: 'row',
    },
    timeLabelContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeLabelItem: {
      marginLeft: 22,
      marginRight: 17,
      width: 100,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    timeLabelText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.note,
    },
    textSaparate: {
      width: 20,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.headline,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    modal: {
      padding: 20,
      backgroundColor: theme.colors.surfaceContainer,
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
    },
    modalTitle: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.subtitle,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButtonContainer: {
      width: 100,
    },
    modalButtonFlex: {
      flexDirection: 'row',
      gap: 20,
    },
    modalButtonCancelLabel: {
      color: theme.colors.error,
    },
    modalErrorText: {
      color: theme.colors.error,
    },
  })
}
