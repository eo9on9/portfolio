import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(classes: TemplateStringsArray | string | string[]) {
  const string = typeof classes === 'string' ? classes : classes.join(' ')
  return string.replace(/\s+/g, ' ').trim()
}

export function cnMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
