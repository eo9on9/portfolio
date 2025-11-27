import { cnMerge } from '@shared/util/cn'
import { PropsWithChildren } from 'react'

interface BeaconProps {
  className?: string
}

export const Beacon = ({
  children,
  className,
}: PropsWithChildren<BeaconProps>) => {
  return (
    <span className={cnMerge('relative', className)}>
      {children}
      <span className="absolute -right-1 -top-1 size-1.5 bg-red-500 rounded-full pointer-events-none animate-[beep_2s_ease-in-out_infinite]" />
    </span>
  )
}
