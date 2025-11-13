import { useLayout } from '@widgets/layout/model/useLayout'
import { cva } from 'class-variance-authority'
import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'

export const MainLayout = ({ children }: PropsWithChildren) => {
  const { isSidebarPinned } = useLayout()

  return (
    <div className="flex min-w-[980px]">
      <Sidebar />
      <div className={contentCn({ isSidebarPinned })}>{children}</div>
    </div>
  )
}

const contentCn = cva(
  'flex-1 flex flex-col gap-6 p-6 pb-10 transition-all duration-200 ease-out',
  {
    variants: {
      isSidebarPinned: {
        true: 'ml-[225px]',
        false: 'ml-[69px]',
      },
    },
  },
)
