import {StyleSheet} from 'react-native'

export function getStyles(width: number, height: number) {
  return StyleSheet.create({
    container: {
      width: width,
      height: height,
      borderRadius: 5,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  })
}
