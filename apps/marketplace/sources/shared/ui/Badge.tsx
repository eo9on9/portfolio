import { cn } from '@shared/util/cn'
import { tw } from '@shared/util/tw'
import { PropsWithChildren } from 'react'

interface BadgeProps {
  className?: string
}

export const Badge = ({
  children,
  className,
}: PropsWithChildren<BadgeProps>) => {
  return <span className={cn(badgeTw, className)}>{children}</span>
}

const badgeTw = tw`inline-block w-fit px-2 py-0.5 text-xs font-medium text-gray-800 rounded-sm bg-gray-100`
