export type Choice = {
  label: string
  value: string
  icon?: string
  disabled?: boolean
}

export type Props = {
  choices: Choice[]
  onChange: (value: string) => void
  initialValue?: string
  containerStyle?: any
  buttonGroupStyle?: any
  activeButtonColor?: string
  activeLabelColor?: string
  disabledColor?: string
}
