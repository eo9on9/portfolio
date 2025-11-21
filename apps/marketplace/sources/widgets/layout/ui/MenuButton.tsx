import { cn } from '@shared/util/cn'
import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

interface MenuButtonProps {
  href: string
  label: string
  icon?: ReactNode
  noticeCount?: number
}

export const MenuButton = ({
  href,
  icon,
  label,
  noticeCount,
}: MenuButtonProps) => {
  const pathname = usePathname()
  const params = useSearchParams()
  const isPressed =
    pathname === href || params.get('from') === href.replace('/', '')

  return (
    <Link href={href} className={linkVariants({ isPressed })}>
      {icon}
      <span className={labelCn}>{label}</span>
      {!!noticeCount && <span className={noticeCountCn}>{noticeCount}</span>}
    </Link>
  )
}

const linkVariants = cva(
  cn([
    /** base */
    'flex items-center w-fit h-7 px-2 gap-1 rounded-sm text-sm font-medium',
    /** animation */
    'transition-bg duration-200 ease-out',
  ]),
  {
    variants: {
      isPressed: {
        true: 'bg-gray-800 text-white cursor-default',
        false: 'bg-transparent text-gray-800 hover:bg-gray-100',
      },
    },
  },
)

const labelCn = cn`hidden tablet:block`

const noticeCountCn = cn`px-1 bg-red-700 text-white text-xs rounded-full`
