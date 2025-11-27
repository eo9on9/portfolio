import { cva } from 'class-variance-authority'
import { useState } from 'react'

interface ToggleGroupProps {
  options: { label: string; value: string }[]
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
    <div className={containerVariants({ fill })}>
      {options.map(option => (
        <button
          type="button"
          key={option.value}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-sm whitespace-nowrap cursor-pointer transition-bg duration-200 ease-out aria-pressed:bg-white aria-pressed:cursor-auto"
          aria-pressed={option.value === value}
          onClick={() => handleChange(option.value)}
        >
          <span className="text-sm font-medium text-gray-800">
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
