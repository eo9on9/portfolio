import { cn } from '@shared/util/cn'
import { ReactNode } from 'react'

interface PageTopProps {
  title: string
  description?: string
  actions?: ReactNode
}

export const PageTop = ({ title, description, actions }: PageTopProps) => {
  return (
    <div className={containerCn}>
      <div className={leftCn}>
        <h2 className={titleCn}>{title}</h2>
        {description && <p className={descriptionCn}>{description}</p>}
      </div>
      {actions && <div className={rightCn}>{actions}</div>}
    </div>
  )
}

const containerCn = cn`flex items-center justify-between`

const leftCn = cn`flex flex-col gap-2`

const titleCn = cn`text-xl font-medium text-gray-800`

const descriptionCn = cn`text-base text-gray-500`

const rightCn = cn`flex items-center gap-2`
