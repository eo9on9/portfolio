import { getNotifications } from '@entities/user/api/getNotifications'
import { updateNotifications } from '@entities/user/api/updateNotifications'
import { Notifications } from '@entities/user/model/notifications'
import { Beacon, Switch, useToast } from '@repo/ui-common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const NotificationSettingContent = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const [notis, setNotis] = useState<Partial<Notifications>>({})

  const { data } = useQuery({
    queryKey: ['profile', 'notifications'],
    queryFn: getNotifications,
  })

  const { mutate } = useMutation({
    mutationFn: updateNotifications,
    onMutate: () => {
      const prevData = queryClient.getQueryData<Notifications>([
        'profile',
        'notifications',
      ])
      return { prevData }
    },
    onError: (error, variables, context) => {
      if (context?.prevData) {
        setNotis(context.prevData)
      }
      toast.error('알림 설정 변경 실패')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'notifications'] })
      toast.success('알림 설정 변경 성공')
    },
  })

  const handleChange = (key: keyof Notifications, value: boolean) => {
    setNotis(prev => ({ ...prev, [key]: value }))
    mutate({ [key]: value })
  }

  useEffect(() => {
    if (data) {
      setNotis(data)
    }
  }, [data])

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-sm border border-gray-200">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium text-gray-800">알림 설정</h3>
        <p className="text-sm text-gray-500">받고 싶은 알림을 설정합니다.</p>
      </div>
      <ul>
        <li className="not-last:pb-4 not-last:mb-4 not-last:border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-800">새로운 주문</p>
              <p className="text-xs text-gray-500">
                새로운 주문이 접수되면 알림을 받습니다.
              </p>
            </div>
            <Beacon className="flex">
              <Switch
                value={notis?.newOrder}
                onChange={value => handleChange('newOrder', value)}
              />
            </Beacon>
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
            <Beacon className="flex">
              <Switch
                value={notis?.lowStock}
                onChange={value => handleChange('lowStock', value)}
              />
            </Beacon>
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
            <Beacon className="flex">
              <Switch
                value={notis?.customerInquiry}
                onChange={value => handleChange('customerInquiry', value)}
              />
            </Beacon>
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
            <Beacon className="flex">
              <Switch
                value={notis?.deliveryStatusChange}
                onChange={value => handleChange('deliveryStatusChange', value)}
              />
            </Beacon>
          </div>
        </li>
        <li className="not-last:pb-4 not-last:mb-4 not-last:border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-800">주간 리포트</p>
              <p className="text-xs text-gray-500">
                매주 월요일 주간 리포트를 받습니다.
              </p>
            </div>
            <Beacon className="flex">
              <Switch
                value={notis?.weeklyReport}
                onChange={value => handleChange('weeklyReport', value)}
              />
            </Beacon>
          </div>
        </li>
      </ul>
    </div>
  )
}
