import { cva } from 'class-variance-authority'
import { useState } from 'react'

export interface SwitchProps {
  defaultValue?: boolean
  value?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

export const Switch = ({
  defaultValue = false,
  value: _value,
  onChange,
  disabled = false,
}: SwitchProps) => {
  const [innerValue, setInnerValue] = useState(defaultValue)

  const value = _value ?? innerValue

  const handleChange = (checked: boolean) => {
    if (checked === _value) return

    setInnerValue(checked)
    onChange?.(checked)
  }

  return (
    <label className={wrapperVariants({ disabled })}>
      <input
        type="checkbox"
        checked={value}
        onChange={() => handleChange(!value)}
        className="peer hidden"
        disabled={disabled}
      />
      <span className={bgVariants({ disabled })} />
      <span className={thumbVariants({ disabled })} />
    </label>
  )
}

const wrapperVariants = cva('inline-block relative', {
  variants: {
    disabled: {
      true: 'cursor-auto',
      false: 'cursor-pointer',
    },
  },
})

const bgVariants = cva(
  'box-content block w-8 h-4 border-2 rounded-full peer-checked:bg-gray-800 peer-checked:border-gray-800 transition-bg duration-200 ease-out',
  {
    variants: {
      disabled: {
        true: 'bg-gray-100 border-gray-100',
        false: 'bg-gray-200 border-gray-200',
      },
    },
  },
)

const thumbVariants = cva(
  'absolute top-0 left-0 w-4 h-4 translate-0.5 bg-white rounded-full transition-left duration-200 ease-out peer-checked:left-4 shadow-sm',
  {
    variants: {
      disabled: {
        true: 'bg-gray-400',
        false: 'bg-white',
      },
    },
  },
)
