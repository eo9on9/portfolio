import { UserProfile } from '@features/user/ui/UserProfile'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { cva } from 'class-variance-authority'
import {
  FileText,
  LayoutDashboard,
  Package,
  Pin,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface SidebarProps {
  isPinned: boolean
  setIsPinned: (isPinned: boolean) => void
}

export const Sidebar = ({ isPinned, setIsPinned }: SidebarProps) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState(false)
  const isOpen = isPinned || isHover

  const currentPath = router.pathname

  return (
    <div
      className={containerCn({ isOpen })}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className={titleCn({ isOpen })}>관리자 시스템</h1>
          <Beacon>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsPinned(!isPinned)}
            >
              <Pin className={pinCn({ isPinned })} />
            </Button>
          </Beacon>
        </div>
        <ul className="flex flex-col gap-1">
          <li>
            <Beacon>
              <Link
                href="/dashboard"
                className={linkCn({ isActive: currentPath === '/dashboard' })}
              >
                <span className={linkIconCn()}>
                  <LayoutDashboard className="w-4 h-4" />
                </span>
                <span className={linkTextCn({ isOpen })}>대시보드</span>
              </Link>
            </Beacon>
          </li>
          <li>
            <Beacon>
              <Link
                href="/customer"
                className={linkCn({ isActive: currentPath === '/customer' })}
              >
                <span className={linkIconCn()}>
                  <Users className="w-4 h-4" />
                </span>
                <span className={linkTextCn({ isOpen })}>고객 관리</span>
              </Link>
            </Beacon>
          </li>
          <li>
            <Beacon>
              <Link
                href="/order"
                className={linkCn({ isActive: currentPath === '/order' })}
              >
                <span className={linkIconCn()}>
                  <ShoppingCart className="w-4 h-4" />
                </span>
                <span className={linkTextCn({ isOpen })}>주문 관리</span>
              </Link>
            </Beacon>
          </li>
          <li>
            <Link
              href="/product"
              className={linkCn({ isActive: currentPath === '/product' })}
              onClick={e => e.preventDefault()}
            >
              <span className={linkIconCn()}>
                <Package className="w-4 h-4" />
              </span>
              <span className={linkTextCn({ isOpen })}>상품 관리</span>
            </Link>
          </li>
          <li>
            <Link
              href="/report"
              className={linkCn({ isActive: currentPath === '/report' })}
              onClick={e => e.preventDefault()}
            >
              <span className={linkIconCn()}>
                <FileText className="w-4 h-4" />
              </span>
              <span className={linkTextCn({ isOpen })}>보고서</span>
            </Link>
          </li>
          <li>
            <Beacon>
              <Link
                href="/setting"
                className={linkCn({ isActive: currentPath === '/setting' })}
              >
                <span className={linkIconCn()}>
                  <Settings className="w-4 h-4" />
                </span>
                <span className={linkTextCn({ isOpen })}>설정</span>
              </Link>
            </Beacon>
          </li>
        </ul>
      </div>
      <UserProfile
        user={{
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '01012345678',
          role: 'admin',
        }}
        isFolded={!isOpen}
      />
    </div>
  )
}

const containerCn = cva(
  'z-50 overflow-y-auto fixed top-0 left-0 bottom-0 flex flex-col justify-between gap-4 box-content px-4 py-6 border-r border-gray-200 bg-white transition-w duration-300 ease-out',
  {
    variants: {
      isOpen: {
        true: 'w-48',
        false: 'w-9',
      },
    },
  },
)

const titleCn = cva(
  'overflow-hidden text-xl font-semibold text-gray-800 whitespace-nowrap transition-all duration-200 ease-out',
  {
    variants: {
      isOpen: {
        true: 'w-full opacity-100',
        false: 'w-0 opacity-0',
      },
    },
  },
)

const pinCn = cva('w-4 h-4 transition-all duration-200 ease-out', {
  variants: {
    isPinned: {
      true: 'text-gray-800',
      false: 'text-gray-400',
    },
  },
})

const linkCn = cva('flex items-center text-gray-800 rounded-sm ', {
  variants: {
    isActive: {
      true: 'bg-gray-100',
      false: 'bg-transparent hover:bg-gray-50',
    },
  },
})

const linkIconCn = cva('flex items-center justify-center w-9 h-8')

const linkTextCn = cva(
  'overflow-hidden flex-1 block text-sm whitespace-nowrap transition-all duration-200 ease-out',
  {
    variants: {
      isOpen: {
        true: 'w-full opacity-100',
        false: 'w-0 opacity-0',
      },
    },
  },
)

const logoutTextCn = cva(
  'overflow-hidden flex-1 block text-sm whitespace-nowrap transition-all duration-200 ease-out',
  {
    variants: {
      isOpen: {
        true: 'w-full opacity-100',
        false: 'w-0 opacity-0',
      },
    },
  },
)
