import { PropsWithChildren, ReactNode } from 'react'

interface CardProps {
  title: string
  icon?: ReactNode
}

export const Card = ({
  title,
  icon,
  children,
}: PropsWithChildren<CardProps>) => {
  return (
    <div className="flex flex-col gap-6 border border-gray-200 bg-white rounded-sm p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        {icon}
      </div>
      {children}
    </div>
  )
}
