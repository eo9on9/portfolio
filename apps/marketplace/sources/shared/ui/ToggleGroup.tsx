import { tw } from '@shared/util/tw'
import { useId, useState } from 'react'

interface ToggleGroupProps {
  name?: string
  options: { label: string; value: string }[]
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

export const ToggleGroup = ({
  name: _name,
  options,
  defaultValue,
  value: _value,
  onChange,
}: ToggleGroupProps) => {
  const id = useId()
  const name = _name ?? id

  const [innerValue, setInnerValue] = useState(defaultValue)

  const value = _value ?? innerValue

  const handleChange = (value: string) => {
    if (value === _value) return

    setInnerValue(value)
    onChange?.(value)
  }

  return (
    <div className={containerTw}>
      {options.map(option => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => handleChange(option.value)}
            className={inputTw}
          />
          <div className={labelTw}>
            <span className={textTw}>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  )
}

const containerTw = tw`inline-flex w-fit items-center gap-2 p-1 bg-gray-100 rounded-lg`

const inputTw = tw`peer hidden`

const labelTw = tw`
  flex items-center justify-center gap-2 px-3 py-1.5 min-w-[100px] rounded-lg peer-checked:bg-white not-peer-checked:cursor-pointer
  transition-bg duration-200 ease-out
`

const textTw = tw`text-sm font-medium text-gray-800`
