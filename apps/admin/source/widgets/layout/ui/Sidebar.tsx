import { UserProfile } from '@features/user/ui/UserProfile'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { useLayout } from '@widgets/layout/model/useLayout'
import { Navigation } from '@widgets/layout/ui/Navigation'
import { cva } from 'class-variance-authority'
import { Pin } from 'lucide-react'

export const Sidebar = () => {
  const {
    isSidebarPinned,
    setIsSidebarPinned,
    isSidebarHover,
    setIsSidebarHover,
  } = useLayout()

  const isOpen = isSidebarPinned || isSidebarHover

  return (
    <div
      className={containerCn({ isOpen })}
      onMouseEnter={() => setIsSidebarHover(true)}
      onMouseLeave={() => setIsSidebarHover(false)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className={titleCn({ isOpen })}>관리자 시스템</h1>
          <Beacon>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsSidebarPinned(!isSidebarPinned)}
            >
              <Pin className={pinCn({ isSidebarPinned })} />
            </Button>
          </Beacon>
        </div>
        <Navigation isFolded={!isOpen} />
      </div>
      <UserProfile isFolded={!isOpen} />
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
    isSidebarPinned: {
      true: 'text-gray-800',
      false: 'text-gray-400',
    },
  },
})
