import { cn } from '@shared/util/cn'
import { PropsWithChildren } from 'react'

interface BeaconProps {
  className?: string
}

export const Beacon = ({
  children,
  className,
}: PropsWithChildren<BeaconProps>) => {
  return (
    <span className={cn('relative', className)}>
      {children}
      <span className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-beep pointer-events-none" />
    </span>
  )
}
