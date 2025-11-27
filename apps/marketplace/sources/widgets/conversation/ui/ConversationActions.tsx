import { sendMessage } from '@features/conversation/api/sendMessage'
import { Conversation } from '@features/conversation/model/conversation'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
              placeholder="메시지를 입력하세요."
              {...register('message', { required: true })}
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
