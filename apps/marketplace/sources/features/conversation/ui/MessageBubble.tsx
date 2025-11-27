import { Message } from '@features/conversation/model/message'
import { MY_NAME } from '@shared/constant/user'
import { toFullDate } from '@shared/util/format'
import { cva } from 'class-variance-authority'

interface MessageBubbleProps {
  message: Message
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMine = message.sender === MY_NAME

  return (
    <div className={containerCn({ isMine })}>
      <div className={innerCn({ isMine })}>
        <p className="text-sm font-medium text-gray-800">{message.sender}</p>
        <p className={bubbleCn({ isMine })}>{message.content}</p>
        <p className="text-sm text-gray-500">{toFullDate(message.createdAt)}</p>
      </div>
    </div>
  )
}

const containerCn = cva('flex', {
  variants: {
    isMine: {
      true: 'justify-end',
      false: 'justify-start',
    },
  },
})

const innerCn = cva('flex flex-col gap-2 max-w-[80%]', {
  variants: {
    isMine: {
      true: 'items-end',
      false: 'items-start',
    },
  },
})

const bubbleCn = cva(
  'text-sm text-gray-800 rounded-sm p-2 whitespace-pre-wrap',
  {
    variants: {
      isMine: {
        true: 'bg-blue-200',
        false: 'bg-gray-200',
      },
    },
  },
)
