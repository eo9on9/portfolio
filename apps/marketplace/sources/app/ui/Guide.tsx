import { AppGuideModal } from '@app/ui/AppGuideModal'
import { ConversationGuide } from '@app/ui/ConversationGuide'
import { guideStorage } from '@shared/store/guideStorage'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export const Guide = () => {
  const pathname = usePathname()

  const [isFirstVisitApp, setIsFirstVisitApp] = useState(
    guideStorage.get().isFirstVisitApp,
  )
  const [isFirstVisitConversation, setIsFirstVisitConversation] = useState(
    guideStorage.get().isFirstVisitConversation,
  )

  const isConversationPage = pathname?.includes('/conversation')

  return (
    <>
      <ConversationGuide
        open={isConversationPage && isFirstVisitConversation}
        onClose={() => {
          setIsFirstVisitConversation(false)
          guideStorage.set('isFirstVisitConversation', false)
        }}
      />
      <AppGuideModal
        open={isFirstVisitApp}
        onClose={() => {
          setIsFirstVisitApp(false)
          guideStorage.set('isFirstVisitApp', false)
        }}
      />
    </>
  )
}
