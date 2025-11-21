import { Badge } from '@shared/ui/Badge'
import { cnMerge } from '@shared/util/cn'
import { MessageSquare } from 'lucide-react'
import Image from 'next/image'

interface MessageCardProps {
  isNew?: boolean
}

export const MessageCard = ({ isNew }: MessageCardProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={cnMerge([
        'flex flex-col gap-4 p-4 border border-gray-200 rounded-sm bg-white cursor-pointer hover:shadow-md transition-shadow duration-200 ease-out',
        isNew && 'border-blue-300 bg-blue-50',
      ])}
    >
      <div className="flex flex-col flex-wrap justify-between gap-4 tablet:flex-row tablet:items-center">
        <div className="flex-1 flex items-center gap-2">
          <MessageSquare className="size-4 text-gray-800" />
          <p className="text-base font-medium text-gray-800">검수집가</p>
          {isNew && <Badge className="bg-red-700 text-white">새 메시지</Badge>}
        </div>
        <p className="text-sm text-gray-500">2025년 11월 21일 오전 10:00</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative size-10 rounded-sm overflow-hidden">
          <Image
            src="/images/wooden-sword.png"
            alt="message"
            width={40}
            height={40}
          />
        </div>
        <p className="text-sm text-gray-500">나무 검</p>
      </div>
      <p className="text-sm text-gray-800">
        나무 검을 구매하고 싶습니다. 얼마에 팔아드릴까요?
      </p>
    </div>
  )
}
