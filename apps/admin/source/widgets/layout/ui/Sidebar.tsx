import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'
import { cva } from 'class-variance-authority'
import {
  FileText,
  LayoutDashboard,
  Package,
  Pin,
  Settings,
  ShoppingCart,
  User,
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
  const [isModalOpen, setIsModalOpen] = useState(false)
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
              href="#"
              className={linkCn({ isActive: currentPath === '/product' })}
            >
              <span className={linkIconCn()}>
                <Package className="w-4 h-4" />
              </span>
              <span className={linkTextCn({ isOpen })}>상품 관리</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={linkCn({ isActive: currentPath === '/report' })}
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
      <div className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2 w-full">
          <div>
            <button onClick={() => setIsModalOpen(true)}>
              <Beacon>
                <div className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full">
                  <User className="w-4 h-4 text-gray-800" />
                </div>
              </Beacon>
            </button>
          </div>
          <div className={avatarTextCn({ isOpen })}>
            <p className="text-sm text-gray-800 font-medium whitespace-nowrap">
              John Doe
            </p>
            <p className="text-xs text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden">
              john.doe@example.com
            </p>
          </div>
        </div>
      </div>
      <Modal
        title="사용자 정보"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <FormField label="이름">
              <Input value="김관리" readOnly />
            </FormField>
            <FormField label="이메일">
              <Input value="admin@example.com" readOnly />
            </FormField>
            <FormField label="전화번호">
              <Input value="010-1234-5678" readOnly />
            </FormField>
            <FormField label="권한">
              <Input value="관리자" readOnly />
            </FormField>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsModalOpen(false)}
          >
            로그아웃
          </Button>
        </div>
      </Modal>
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

const avatarTextCn = cva(
  'flex-1 min-w-0 transition-all duration-200 ease-out',
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
