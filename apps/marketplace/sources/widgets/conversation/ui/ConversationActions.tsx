import { sendMessage } from '@features/conversation/api/sendMessage'
import { Conversation } from '@features/conversation/model/conversation'
import { Beacon } from '@repo/ui-common'
import {
  VALIDATION_MESSAGE,
  VALIDATION_REQUIRED,
} from '@shared/constant/validation'
import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface ConversationActionsProps {
  conversation: Conversation
}

export const ConversationActions = ({
  conversation,
}: ConversationActionsProps) => {
  const queryClient = useQueryClient()

  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      message: '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({
        queryKey: ['messages', conversation.conversationId],
      })
    },
  })

  const handleSendMessage = handleSubmit(data => {
    mutate({
      partner: conversation.partner,
      productId: conversation.productId,
      content: data.message,
    })
  })

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md border-t border-gray-200">
      <div className="w-full max-w-[1280px] mx-auto px-6 py-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 flex flex-col">
            <Input
              icon={<Send className="size-4 text-gray-400" />}
              placeholder="메시지를 입력하세요."
              autoComplete="off"
              {...register('message', {
                required: VALIDATION_REQUIRED.message,
                pattern: {
                  value: VALIDATION_MESSAGE.pattern,
                  message: VALIDATION_MESSAGE.message,
                },
              })}
            />
          </div>
          <Beacon>
            <Button type="submit" disabled={!isValid}>
              전송
            </Button>
          </Beacon>
        </form>
      </div>
    </div>
  )
}
