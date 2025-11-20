import { cn, cnMerge } from '@shared/util/cn'
import { PropsWithChildren } from 'react'

interface BeaconProps {
  className?: string
}

export const Beacon = ({
  children,
  className,
}: PropsWithChildren<BeaconProps>) => {
  return (
    <span className={cnMerge(containerTw, className)}>
      {children}
      <span className={beaconTw} />
    </span>
  )
}

const containerTw = cn`relative`

const beaconTw = cn([
  /** base */
  'absolute -right-1 -top-1 size-1.5 bg-red-500 rounded-full pointer-events-none',
  /** animation */
  'animateBeep',
])
