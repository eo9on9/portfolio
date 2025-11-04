import { PropsWithChildren } from 'react'

export const Beacon = ({ children }: PropsWithChildren) => {
  return (
    <span className="relative">
      {children}
      <span className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-beep pointer-events-none" />
    </span>
  )
}
