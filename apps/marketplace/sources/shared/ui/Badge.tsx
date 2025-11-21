import { cn, cnMerge } from '@shared/util/cn'
import { PropsWithChildren } from 'react'

interface BadgeProps {
  className?: string
}

export const Badge = ({
  children,
  className,
}: PropsWithChildren<BadgeProps>) => {
  return <span className={cnMerge(badgeTw, className)}>{children}</span>
}

const badgeTw = cn`inline-block w-fit px-2 py-0.5 text-xs font-medium text-gray-800 rounded-sm bg-white`
