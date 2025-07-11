import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
    },
    form: {
      marginTop: 20,
      gap: 10,
    },
    flexContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      gap: 20,
    },
    expiredInputContainer: {
      flex: 2,
    },
    cvvInputContainer: {
      flex: 1,
    },
    error: {
      paddingHorizontal: 0,
    },
    buttonContainer: {
      marginTop: 'auto',
      marginBottom: 10,
    },
  })
}
