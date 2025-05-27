export type DropdownItemProps = {
  label: string
  value: string
  icon?: string
  disabled?: boolean
}

export type Props = {
  data: DropdownItemProps[]
  placeholder: string
  onChange: (value: string[]) => void
  multiple?: boolean
  defaultValueByIndex?: number[]
  width?: number
  containerStyle?: any
  contentContainerStyle?: any
  placeholderStyle?: any
  itemStyle?: any
  itemSelectedStyle?: any
  placeholderIconColor?: any
}
