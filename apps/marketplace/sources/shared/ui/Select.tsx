import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '@radix-ui/react-select'
import { cva } from 'class-variance-authority'
import { Check, ChevronDown } from 'lucide-react'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  options: SelectOption[]
  placeholder?: string
  id?: string
  isError?: boolean
}

export const Select = ({
  value,
  onChange,
  defaultValue,
  options,
  id,
  placeholder,
  isError,
}: SelectProps) => {
  return (
    <SelectRoot
      value={value}
      onValueChange={onChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger id={id} className={triggerVariants({ isError })}>
        <SelectValue placeholder={placeholder} />
        <SelectIcon>
          <ChevronDown className="size-4 text-gray-500" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          position="popper"
          sideOffset={8}
          className="z-110 animate-[selectIn_200ms_ease-out_forwards] focus:ring-0"
        >
          <SelectViewport className="flex flex-col gap-1 min-w-(--radix-select-trigger-width) p-2 border border-gray-300 bg-white rounded-sm shadow-md">
            {options.map(({ value, label }) => (
              <SelectItem
                key={value}
                value={value}
                className="flex items-center gap-2 px-2 h-8 text-sm text-gray-800 outline-none rounded-sm focus:bg-gray-100 cursor-pointer focus:ring-0"
              >
                <SelectItemText>{label}</SelectItemText>
                <SelectItemIndicator>
                  <Check className="size-4 text-gray-500" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  )
}

const triggerVariants = cva(
  'inline-flex items-center justify-between gap-2 h-10 pl-4 pr-3 text-sm text-gray-800 data-placeholder:text-gray-400 bg-gray-100 rounded-sm cursor-pointer',
  {
    variants: {
      isError: {
        true: 'outline-1 outline-error',
        false: 'outline-transparent',
      },
    },
  },
)
