import { ReactNode } from 'react'

interface PageTopProps {
  title: string
  description?: string
  actions?: ReactNode
}

export const PageTop = ({ title, description, actions }: PageTopProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium text-gray-800">{title}</h2>
        {description && (
          <p className="text-base text-gray-500">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
