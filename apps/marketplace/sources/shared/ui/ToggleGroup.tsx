import { tw } from '@shared/util/tw'
import { useState } from 'react'

interface ToggleGroupProps {
  options: { label: string; value: string }[]
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

export const ToggleGroup = ({
  options,
  defaultValue,
  value: _value,
  onChange,
}: ToggleGroupProps) => {
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
        <button
          type="button"
          key={option.value}
          className={labelTw}
          aria-pressed={option.value === value}
          onClick={() => handleChange(option.value)}
        >
          <span className={textTw}>{option.label}</span>
        </button>
      ))}
    </div>
  )
}

const containerTw = tw`inline-flex w-fit items-center gap-2 p-1 bg-gray-100 rounded-sm`

const labelTw = tw([
  /** base */
  'flex items-center justify-center gap-2 px-3 py-1.5 min-w-[100px] rounded-sm cursor-pointer',
  /** animation */
  'transition-bg duration-200 ease-out',
  /** states */
  'aria-pressed:bg-white aria-pressed:cursor-auto',
])

const textTw = tw`text-sm font-medium text-gray-800`
