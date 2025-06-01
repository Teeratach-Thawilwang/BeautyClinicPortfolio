import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.subtitle,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    timeLabelContainer: {
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
    timeLabelSpace: {
      width: 30,
    },
    flexRow: {
      flexDirection: 'row',
    },
    textSaparate: {
      width: 20,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.headline,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    buttonBoxContainer: {
      flexDirection: 'row',
      gap: 20,
    },
    buttonContainer: {
      width: 100,
    },
    buttonCancelLabel: {
      color: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
    },
  })
}
