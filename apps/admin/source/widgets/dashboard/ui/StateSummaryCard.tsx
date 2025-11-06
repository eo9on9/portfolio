import { Card } from '@shared/ui/Card'
import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'

interface StateSummaryCardProps {
  title: string
  icon: ReactNode
  content: ReactNode
  percentage?: number
}

export const StateSummaryCard = ({
  title,
  icon,
  content,
  percentage = 0,
}: StateSummaryCardProps) => {
  const isPositive = percentage > 0
  const percentageText = isPositive ? `+${percentage}%` : `${percentage}%`

  return (
    <Card title={title} icon={icon}>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-medium text-gray-800">{content}</p>
        {percentage && (
          <p className="flex items-center gap-1 text-xs">
            <span className={percentageVariants({ isPositive })}>
              {percentageText}
            </span>
            <span className="text-gray-500">지난달 대비</span>
          </p>
        )}
      </div>
    </Card>
  )
}

const percentageVariants = cva(null, {
  variants: {
    isPositive: {
      true: 'text-green-500',
      false: 'text-red-400',
    },
  },
})
