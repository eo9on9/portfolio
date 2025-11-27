import { Message } from '@features/conversation/model/message'
import { MessageBubble } from '@features/conversation/ui/MessageBubble'
import { groupMessagesByDate } from '@features/conversation/util/groupMessagesByDate'
import { toDate } from '@shared/util/format'

interface MessageListProps {
  messages: Message[]
}

export const MessageList = ({ messages }: MessageListProps) => {
  const groupedMessages = groupMessagesByDate(messages || [])

  return (
    <div className="flex flex-col gap-4 pt-20">
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <div key={date}>
          <div className="flex justify-center mt-8 mb-4">
            <p className="text-sm text-gray-500 bg-gray-200 rounded-sm p-2">
              {toDate(new Date(date).getTime())}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {messages.map(message => (
              <MessageBubble key={message.messageId} message={message} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
