import { Beacon } from '@repo/ui-common'
import { usePusher } from '@shared/hook/usePusher'
import { MenuButton } from '@widgets/layout/ui/MenuButton'
import { Home, MessageSquare, Package, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const { newMessageEvent } = usePusher()

  const newMessageCount = newMessageEvent?.data as number

  return (
    <header className="z-100 fixed top-0 left-0 right-0 border-b border-gray-200 backdrop-blur-md">
      <div className="flex items-center justify-between w-full max-w-[1280px] h-14 mx-auto px-6 ">
        <div className="flex items-center gap-2">
          <Link
            href="/main"
            className="relative overflow-hidden size-10 rounded-sm"
          >
            <Image src="/images/logo.png" alt="logo" width={40} height={40} />
          </Link>
          <h1 className="text-sm font-semibold text-gray-800 hidden tablet:block">
            아이템 거래소
          </h1>
        </div>
        <ul className="flex items-center gap-1">
          <li>
            <Beacon>
              <MenuButton
                href="/main"
                icon={<Home className="size-4" />}
                label="메인"
              />
            </Beacon>
          </li>
          <li>
            <Beacon>
              <MenuButton
                href="/search"
                icon={<Search className="size-4" />}
                label="아이템 검색"
              />
            </Beacon>
          </li>
          <li>
            <Beacon>
              <MenuButton
                href="/manage"
                icon={<Package className="size-4" />}
                label="아이템 관리"
              />
            </Beacon>
          </li>
          <li>
            <Beacon>
              <MenuButton
                href="/conversation"
                icon={<MessageSquare className="size-4" />}
                label="대화"
                noticeCount={newMessageCount}
              />
            </Beacon>
          </li>
        </ul>
      </div>
    </header>
  )
}
