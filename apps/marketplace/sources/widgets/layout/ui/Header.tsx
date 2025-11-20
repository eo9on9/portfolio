import { cn } from '@shared/util/cn'
import { MenuButton } from '@widgets/layout/ui/MenuButton'
import { Home, MessageSquare, Package, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className={containerCn}>
      <div className={leftCn}>
        <Link href="/main" className={logoCn}>
          <Image src="/images/logo.png" alt="logo" width={40} height={40} />
        </Link>
        <h1 className={titleCn}>아이템 거래소</h1>
      </div>
      <ul className={menuCn}>
        <li>
          <MenuButton
            href="/main"
            icon={<Home className="size-4" />}
            label="메인"
          />
        </li>
        <li>
          <MenuButton
            href="/search"
            icon={<Search className="size-4" />}
            label="아이템 검색"
          />
        </li>
        <li>
          <MenuButton
            href="/manage"
            icon={<Package className="size-4" />}
            label="아이템 관리"
          />
        </li>
        <li>
          <MenuButton
            href="/message"
            icon={<MessageSquare className="size-4" />}
            label="쪽지함"
            noticeCount={3}
          />
        </li>
      </ul>
    </header>
  )
}

const containerCn = cn`z-100 fixed top-0 left-0 right-0 flex items-center justify-between h-14 px-6 border-b border-gray-200 backdrop-blur-md`

const leftCn = cn`flex items-center gap-2`

const logoCn = cn`relative overflow-hidden size-10 rounded-sm`

const titleCn = cn`text-sm font-semibold text-gray-800 hidden tablet:block`

const menuCn = cn`flex items-center gap-1`
