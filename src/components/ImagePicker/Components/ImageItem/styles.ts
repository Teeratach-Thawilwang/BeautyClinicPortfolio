import {StyleSheet} from 'react-native'

export function getStyles() {
  return StyleSheet.create({
    imageBox: {
      width: 100,
      height: 100,
      borderRadius: 8,
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    removeIcon: {
      margin: 5,
      width: 24,
      height: 24,
      color: '#FFFFFF',

      position: 'absolute',
      top: 0,
      right: 0,
    },
  })
}
