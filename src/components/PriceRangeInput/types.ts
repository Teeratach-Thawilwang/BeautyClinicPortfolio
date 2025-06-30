export type Props = {
  onChangeFinish: (values: number[]) => void
  values: number[]
  min: number
  max: number
  step?: number
}
