import { Beacon } from '@shared/ui/Beacon'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { Bell, Lock, User } from 'lucide-react'
import { useState } from 'react'
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
  const [selectedTab, setSelectedTab] = useState(ToggleGroupOptions[0].value)

  return (
    <MainLayout>
      <PageTop title="설정" description="시스템 설정을 관리합니다." />
      <Beacon className="w-fit">
        <ToggleGroup
          options={ToggleGroupOptions}
          value={selectedTab}
          onChange={setSelectedTab}
        />
      </Beacon>
      {selectedTab === 'profile' && <ProfileSettingContent />}
      {selectedTab === 'notification' && <NotificationSettingContent />}
      {selectedTab === 'security' && <SecuritySettingContent />}
    </MainLayout>
  )
}
