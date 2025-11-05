import { useState } from 'react'

interface SwitchProps {
  defaultValue?: boolean
  value?: boolean
  onChange?: (checked: boolean) => void
}

export const Switch = ({
  defaultValue = false,
  value: _value,
  onChange,
}: SwitchProps) => {
  const [innerValue, setInnerValue] = useState(defaultValue)

  const value = _value ?? innerValue

  const handleChange = (checked: boolean) => {
    if (checked === _value) return

    setInnerValue(checked)
    onChange?.(checked)
  }

  return (
    <label className="inline-block relative cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={() => handleChange(!value)}
        className="peer hidden"
      />
      <span className="box-content block w-8 h-4 bg-gray-200 border-2 border-gray-200 rounded-full peer-checked:bg-gray-800 peer-checked:border-gray-800 transition-bg duration-200 ease-out" />
      <span className="absolute top-0 left-0 w-4 h-4 translate-0.5 bg-white rounded-full transition-left duration-200 ease-out peer-checked:left-4 shadow-sm" />
    </label>
  )
}
