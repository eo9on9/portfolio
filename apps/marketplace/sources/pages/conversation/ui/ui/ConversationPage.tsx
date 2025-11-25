import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import Image from 'next/image'
import { useEffect } from 'react'

export const ConversationPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
    })
  }, [])

  return (
    <MainLayout>
      <div className="fixed top-14 left-0 flex flex-wrap gap-2 items-center justify-between w-full px-6 py-2 backdrop-blur-md border-b border-gray-200">
        <p className="text-base font-medium text-gray-800">
          검수집가님과의 대화
        </p>
        <div className="flex items-center gap-2 border border-gray-200 rounded-sm p-1 bg-white">
          <div className="relative size-10 rounded-sm overflow-hidden">
            <Image
              src="/images/wooden-sword.png"
              alt="message"
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-800">나무 검</p>
              <ProductTypeBadge type="buy" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-blue-600">300,000 G</p>
              <p className="text-sm text-gray-500">x 1</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-20">
        {/* 날짜 */}
        <div className="flex justify-center mb-4">
          <p className="text-sm text-gray-500 bg-gray-200 rounded-sm p-2">
            2025년 11월 18일
          </p>
        </div>

        {/* 왼쪽 메시지 */}
        <div className="flex justify-start">
          <div className="flex flex-col gap-2 max-w-[80%]">
            <p className="text-sm font-medium text-gray-800">검수집가</p>
            <p className="text-sm text-gray-800 bg-gray-200 rounded-sm p-2">
              나무 검을 구매하고 싶습니다. 얼마에 팔아드릴까요?
            </p>
            <p className="text-sm text-gray-500">2025년 11월 18일 오전 10:00</p>
          </div>
        </div>

        {/* 오른쪽 메시지 */}
        <div className="flex justify-end">
          <div className="flex flex-col items-end gap-2 max-w-[80%]">
            <p className="text-sm font-medium text-gray-800">나</p>
            <p className="text-sm text-gray-800 bg-blue-200 rounded-sm p-2">
              나무 검을 구매하고 싶습니다. 얼마에 팔아드릴까요?
            </p>
            <p className="text-sm text-gray-500">2025년 11월 18일 오전 10:00</p>
          </div>
        </div>

        {/* 왼쪽 메시지 */}
        <div className="flex justify-start">
          <div className="flex flex-col gap-2 max-w-[80%]">
            <p className="text-sm font-medium text-gray-800">검수집가</p>
            <p className="text-sm text-gray-800 bg-gray-200 rounded-sm p-2">
              나무 검을 구매하고 싶습니다. 얼마에 팔아드릴까요? 나무 검을
              구매하고 싶습니다. 얼마에 팔아드릴까요? 나무 검을 구매하고
              싶습니다. 얼마에 팔아드릴까요? 나무 검을 구매하고 싶습니다. 얼마에
              팔아드릴까요?
            </p>
            <p className="text-sm text-gray-500">2025년 11월 18일 오전 10:00</p>
          </div>
        </div>

        {/* 오른쪽 메시지 */}
        <div className="flex justify-end">
          <div className="flex flex-col items-end gap-2 max-w-[80%]">
            <p className="text-sm font-medium text-gray-800">나</p>
            <p className="text-sm text-gray-800 bg-blue-200 rounded-sm p-2">
              나무 검을 구매하고 싶습니다. 얼마에 팔아드릴까요?
            </p>
            <p className="text-sm text-gray-500">2025년 11월 18일 오전 10:00</p>
          </div>
        </div>

        {/* 왼쪽 메시지 */}
        <div className="flex justify-start">
          <div className="flex flex-col gap-2 max-w-[80%]">
            <p className="text-sm font-medium text-gray-800">검수집가</p>
            <p className="text-sm text-gray-800 bg-gray-200 rounded-sm p-2">
              나무 검을 구매하고 싶습니다. 얼마에 팔아드릴까요?
            </p>
            <p className="text-sm text-gray-500">2025년 11월 18일 오전 10:00</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-6 py-4 backdrop-blur-md border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex flex-col">
            <Input placeholder="메시지를 입력하세요." />
          </div>
          <Button>전송</Button>
        </div>
      </div>
    </MainLayout>
  )
}
