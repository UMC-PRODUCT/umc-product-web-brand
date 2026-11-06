export interface FilterOption {
  value: string
  label: string
  count?: number
  breakBefore?: boolean
}

export interface FilterProps {
  label: string
  options: readonly FilterOption[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export const formatOptionLabel = ({ label, count }: FilterOption) =>
  count === undefined ? label : `${label} ${count}`
