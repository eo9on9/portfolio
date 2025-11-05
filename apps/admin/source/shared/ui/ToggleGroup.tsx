import { ReactNode, useId, useState } from 'react'

interface ToggleGroupProps {
  name?: string
  options: { icon?: ReactNode; label: string; value: string }[]
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
    <div className="inline-flex w-fit items-center gap-2 p-1 bg-gray-100 rounded-sm">
      {options.map(option => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => handleChange(option.value)}
            className="peer hidden"
          />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm peer-checked:bg-white not-peer-checked:cursor-pointer">
            {option.icon && <span>{option.icon}</span>}
            <span className="text-sm font-medium text-gray-800">
              {option.label}
            </span>
          </div>
        </label>
      ))}
    </div>
  )
}
