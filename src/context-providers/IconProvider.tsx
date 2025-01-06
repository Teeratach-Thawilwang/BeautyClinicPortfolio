import React from 'react'
import AntDesignIcon from 'react-native-vector-icons/AntDesign.js'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome.js'
import {IconProps} from 'react-native-vector-icons/Icon'
import IoniconsIcon from 'react-native-vector-icons/Ionicons.js'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons.js'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons.js'

export default function IconProvider(props: IconProps) {
  const {name, ...rest} = props

  if (name.startsWith('fa-')) {
    return <AwesomeIcon name={name.replace('fa-', '')} {...rest} />
  }
  if (name.startsWith('ant-')) {
    return <AntDesignIcon name={name.replace('ant-', '')} {...rest} />
  }
  if (name.startsWith('ion-')) {
    return <IoniconsIcon name={name.replace('ion-', '')} {...rest} />
  }
  if (name.startsWith('mat-')) {
    return <MaterialIconsIcon name={name.replace('mat-', '')} {...rest} />
  }

  return <MaterialCommunityIconsIcon name={name} {...rest} />
}
