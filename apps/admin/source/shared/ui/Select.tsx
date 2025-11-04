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
import { Check, ChevronDown } from 'lucide-react'

interface SelectProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  options: { label: string; value: string }[]
  placeholder?: string
  id?: string
}

export const Select = ({
  value,
  onChange,
  defaultValue,
  options,
  id,
  placeholder,
}: SelectProps) => (
  <SelectRoot
    value={value}
    onValueChange={onChange}
    defaultValue={defaultValue}
  >
    <SelectTrigger
      id={id}
      className="inline-flex items-center justify-between gap-2 h-10 pl-4 pr-3 text-sm text-gray-800 data-placeholder:text-gray-400 outline-none bg-gray-100 rounded-sm cursor-pointer"
    >
      <SelectValue placeholder={placeholder} />
      <SelectIcon>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </SelectIcon>
    </SelectTrigger>
    <SelectPortal>
      <SelectContent position="popper" sideOffset={8} className="animate-in">
        <SelectViewport className="flex flex-col gap-1 min-w-(--radix-select-trigger-width) p-2 border border-gray-300 bg-white rounded-sm shadow-md">
          {options.map(({ value, label }) => (
            <SelectItem
              key={value}
              value={value}
              className="flex items-center gap-2 px-2 h-8 text-sm text-gray-800 outline-none rounded-sm focus:bg-gray-100 cursor-pointer"
            >
              <SelectItemText>{label}</SelectItemText>
              <SelectItemIndicator>
                <Check className="w-4 h-4 text-gray-500" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
)
