import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Switch } from '@shared/ui/Switch'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { Bell, Lock, User } from 'lucide-react'
import { useState } from 'react'

export const SettingPage = () => {
  const [selectedTab, setSelectedTab] = useState('profile')

  return (
    <MainLayout>
      <PageTop title="설정" description="시스템 설정을 관리합니다." />
      <Beacon className="w-fit">
        <ToggleGroup
          options={[
            {
              label: '프로필',
              value: 'profile',
              icon: <User className="w-3 h-3 text-gray-800" />,
            },
            {
              label: '알림',
              value: 'notification',
              icon: <Bell className="w-3 h-3 text-gray-800" />,
            },
            {
              label: '보안',
              value: 'security',
              icon: <Lock className="w-3 h-3 text-gray-800" />,
            },
          ]}
          value={selectedTab}
          onChange={setSelectedTab}
        />
      </Beacon>
      {selectedTab === 'profile' && (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-sm border border-gray-200">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-gray-800">프로필</h3>
            <p className="text-sm text-gray-500">프로필 정보를 관리합니다.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField label="이메일">
              <Input value="admin@example.com" readOnly />
            </FormField>
            <FormField label="이름">
              <Input value="김관리" />
            </FormField>
            <FormField label="전화번호">
              <Input value="010-1234-5678" />
            </FormField>
            <FormField label="권한">
              <Input value="관리자" />
            </FormField>
          </div>
          <div className="flex items-center justify-end">
            <Beacon>
              <Button variant="primary" size="lg">
                변경사항 저장
              </Button>
            </Beacon>
          </div>
        </div>
      )}
      {selectedTab === 'notification' && (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-sm border border-gray-200">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-gray-800">알림 설정</h3>
            <p className="text-sm text-gray-500">
              받고 싶은 알림을 설정합니다.
            </p>
          </div>
          <ul>
            <li className="not-last:pb-4 not-last:mb-4 not-last:border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">
                    새로운 주문
                  </p>
                  <p className="text-xs text-gray-500">
                    새로운 주문이 접수되면 알림을 받습니다.
                  </p>
                </div>
                <Switch defaultValue={false} />
              </div>
            </li>
            <li className="not-last:pb-4 not-last:mb-4 not-last:border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">재고 부족</p>
                  <p className="text-xs text-gray-500">
                    재고가 부족하면 알림을 받습니다.
                  </p>
                </div>
                <Switch defaultValue={true} />
              </div>
            </li>
            <li className="not-last:pb-4 not-last:mb-4 not-last:border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">고객 문의</p>
                  <p className="text-xs text-gray-500">
                    새로운 고객 문의가 등록되면 알림을 받습니다.
                  </p>
                </div>
                <Switch defaultValue={true} />
              </div>
            </li>
            <li className="not-last:pb-4 not-last:mb-4 not-last:border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">
                    배송 상태 변경
                  </p>
                  <p className="text-xs text-gray-500">
                    주문 배송 상태가 변경되면 알림을 받습니다.
                  </p>
                </div>
                <Switch defaultValue={false} />
              </div>
            </li>
            <li className="not-last:pb-4 not-last:mb-4 not-last:border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">
                    주간 리포트
                  </p>
                  <p className="text-xs text-gray-500">
                    매주 월요일 주간 리포트를 받습니다.
                  </p>
                </div>
                <Switch defaultValue={true} />
              </div>
            </li>
          </ul>
        </div>
      )}

      {selectedTab === 'security' && (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-sm border border-gray-200">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-gray-800">
              비밀번호 변경
            </h3>
            <p className="text-sm text-gray-500">
              정기적으로 비밀번호를 변경하세요.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField label="마지막 변경일">
              <Input value="2025-01-01" readOnly />
            </FormField>
            <FormField label="현재 비밀번호">
              <Input type="password" placeholder="••••••" />
            </FormField>
            <FormField label="새 비밀번호">
              <Input type="password" placeholder="••••••" />
            </FormField>
            <FormField label="새 비밀번호 확인">
              <Input type="password" placeholder="••••••" />
            </FormField>
          </div>
          <div className="flex items-center justify-end">
            <Button variant="primary" size="lg">
              비밀번호 변경
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  )
}
