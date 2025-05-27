import React, {useState} from 'react'
import {View} from 'react-native'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function ButtonChoice({
  data,
  onChange,
  initialValue,
  multiple = false,
  containerStyle,
  buttonContainerStyle,
  buttonLabelStyle,
  activeButtonContainerStyle,
  activeButtonLabelStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [activeValues, setActiveValues] = useState(initialValue ?? [])
  const normalContainerStyle = [styles.buttonContainer, buttonContainerStyle]
  const normalLabelStyle = [styles.buttonLabel, buttonLabelStyle]
  const activeContainerStyle = [
    styles.activeButtonContainer,
    activeButtonContainerStyle,
  ]
  const activeLabelStyle = [styles.activeButtonLabel, activeButtonLabelStyle]

  return (
    <View style={[styles.container, containerStyle]}>
      {data.map(({label, value}, index) => {
        const isActive = activeValues.some(val => val === value)
        return (
          <Button
            key={index}
            containerStyle={
              isActive ? activeContainerStyle : normalContainerStyle
            }
            labelStyle={isActive ? activeLabelStyle : normalLabelStyle}
            onPress={() => {
              let newValues = multiple ? [...activeValues, value] : [value]
              if (isActive) {
                newValues = activeValues.filter(val => val !== value)
              }
              setActiveValues(newValues)
              onChange(newValues)
            }}>
            {label}
          </Button>
        )
      })}
    </View>
  )
}
