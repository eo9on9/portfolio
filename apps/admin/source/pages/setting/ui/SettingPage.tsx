import { Beacon } from '@repo/ui-common'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { Bell, Lock, User } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { NotificationSettingContent } from './NotificationSettingContent'
import { ProfileSettingContent } from './ProfileSettingContent'
import { SecuritySettingContent } from './SecuritySettingContent'

const ToggleGroupOptions = [
  {
    label: '프로필',
    value: 'profile',
    icon: <User className="size-3 text-gray-800" />,
  },
  {
    label: '알림',
    value: 'notification',
    icon: <Bell className="size-3 text-gray-800" />,
  },
  {
    label: '보안',
    value: 'security',
    icon: <Lock className="size-3 text-gray-800" />,
  },
]

export const SettingPage = () => {
  const router = useRouter()
  const params = useSearchParams()

  const toggleValue = params.get('toggle') ?? ToggleGroupOptions[0]?.value

  const setToggle = (value: string) => {
    const q = new URLSearchParams()
    q.set('toggle', value)
    const qs = q.toString() ?? ''
    router.push(`?${qs}`)
  }

  return (
    <MainLayout>
      <PageTop title="설정" description="시스템 설정을 관리합니다." />
      <Beacon className="w-fit">
        <ToggleGroup
          options={ToggleGroupOptions}
          value={toggleValue}
          onChange={value => setToggle(value)}
        />
      </Beacon>
      {toggleValue === 'profile' && <ProfileSettingContent />}
      {toggleValue === 'notification' && <NotificationSettingContent />}
      {toggleValue === 'security' && <SecuritySettingContent />}
    </MainLayout>
  )
}
