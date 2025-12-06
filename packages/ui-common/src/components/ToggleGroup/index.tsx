import { cva } from 'class-variance-authority'
import { useState } from 'react'

export interface ToggleGroupOption {
  label: string
  value: string
}

export interface ToggleGroupProps {
  options: ToggleGroupOption[]
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  fill?: boolean
}

export const ToggleGroup = ({
  options,
  defaultValue,
  value: _value,
  onChange,
  fill = false,
}: ToggleGroupProps) => {
  const [innerValue, setInnerValue] = useState(defaultValue)

  const value = _value ?? innerValue

  const handleChange = (value: string) => {
    if (value === _value) return

    setInnerValue(value)
    onChange?.(value)
  }

  return (
    <div className={containerVariants({ fill })} role="radiogroup">
      {options.map(option => (
        <button
          role="radio"
          key={option.value}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-sm outline-none whitespace-nowrap transition-bg duration-200 ease-out aria-checked:bg-white aria-checked:cursor-auto focus-visible-ring"
          aria-checked={option.value === value}
          onClick={() => handleChange(option.value)}
        >
          <span className="font-pretendard text-sm font-medium text-gray-800">
            {option.label}
          </span>
        </button>
      ))}
    </div>
  )
}

const containerVariants = cva(
  'inline-flex items-center gap-2 p-1 bg-gray-100 rounded-sm',
  {
    variants: {
      fill: {
        true: 'w-full',
        false: 'w-fit',
      },
    },
  },
)
