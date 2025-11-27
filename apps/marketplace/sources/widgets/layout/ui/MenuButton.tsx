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
    params.get('from') === href.replace('/', '') || pathname?.includes(href)

  return (
    <Link href={href} className={linkVariants({ isPressed })}>
      {icon}
      <span className="hidden tablet:block">{label}</span>
      {!!noticeCount && (
        <span className="px-1 bg-red-700 text-white text-xs rounded-full">
          {noticeCount}
        </span>
      )}
    </Link>
  )
}

const linkVariants = cva(
  'flex items-center w-fit h-7 px-2 gap-1 rounded-sm text-sm font-medium transition-bg duration-200 ease-out',
  {
    variants: {
      isPressed: {
        true: 'bg-gray-800 text-white',
        false: 'bg-transparent text-gray-800 hover:bg-gray-100',
      },
    },
  },
)
