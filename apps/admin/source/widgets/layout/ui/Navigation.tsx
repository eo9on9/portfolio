import { Beacon } from '@repo/ui-common'
import { cva } from 'class-variance-authority'
import {
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavigationProps {
  isFolded: boolean
}

export const Navigation = ({ isFolded }: NavigationProps) => {
  const { pathname } = useRouter()

  return (
    <ul className="flex flex-col gap-1">
      <li>
        <Beacon>
          <Link
            href="/dashboard"
            className={linkCn({ isActive: pathname === '/dashboard' })}
          >
            <span className={linkIconCn()}>
              <LayoutDashboard className={iconCn()} />
            </span>
            <span className={linkTextCn({ isFolded })}>대시보드</span>
          </Link>
        </Beacon>
      </li>
      <li>
        <Beacon>
          <Link
            href="/customer"
            className={linkCn({ isActive: pathname === '/customer' })}
          >
            <span className={linkIconCn()}>
              <Users className={iconCn()} />
            </span>
            <span className={linkTextCn({ isFolded })}>고객 관리</span>
          </Link>
        </Beacon>
      </li>
      <li>
        <Beacon>
          <Link
            href="/order"
            className={linkCn({ isActive: pathname === '/order' })}
          >
            <span className={linkIconCn()}>
              <ShoppingCart className={iconCn()} />
            </span>
            <span className={linkTextCn({ isFolded })}>주문 관리</span>
          </Link>
        </Beacon>
      </li>
      <li>
        <Link
          href="/product"
          className={linkCn({ isActive: pathname === '/product' })}
          onClick={e => e.preventDefault()}
        >
          <span className={linkIconCn()}>
            <Package className={iconCn()} />
          </span>
          <span className={linkTextCn({ isFolded })}>상품 관리</span>
        </Link>
      </li>
      <li>
        <Link
          href="/report"
          className={linkCn({ isActive: pathname === '/report' })}
          onClick={e => e.preventDefault()}
        >
          <span className={linkIconCn()}>
            <FileText className={iconCn()} />
          </span>
          <span className={linkTextCn({ isFolded })}>보고서</span>
        </Link>
      </li>
      <li>
        <Beacon>
          <Link
            href="/setting"
            className={linkCn({ isActive: pathname === '/setting' })}
          >
            <span className={linkIconCn()}>
              <Settings className={iconCn()} />
            </span>
            <span className={linkTextCn({ isFolded })}>설정</span>
          </Link>
        </Beacon>
      </li>
    </ul>
  )
}

const linkCn = cva('flex items-center text-gray-800 rounded-sm ', {
  variants: {
    isActive: {
      true: 'bg-gray-100',
      false: 'bg-transparent hover:bg-gray-50',
    },
  },
})

const linkIconCn = cva('flex items-center justify-center w-9 h-8')

const iconCn = cva('size-4')

const linkTextCn = cva(
  'overflow-hidden flex-1 block text-sm whitespace-nowrap transition-all duration-200 ease-out',
  {
    variants: {
      isFolded: {
        true: 'w-0 opacity-0',
        false: 'w-full opacity-100',
      },
    },
  },
)
