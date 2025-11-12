import { getProfile } from '@entities/user/api/getProfile'
import { Beacon } from '@shared/ui/Beacon'
import { useQuery } from '@tanstack/react-query'
import { cva } from 'class-variance-authority'
import { User as UserIcon } from 'lucide-react'
import { useState } from 'react'
import { ProfileModal } from './ProfileModal'

interface UserProfileProps {
  isFolded?: boolean
}

export const UserProfile = ({ isFolded = false }: UserProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    throwOnError: true,
    retry: false,
  })

  return (
    <>
      <div className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2 w-full">
          <div>
            <button onClick={() => setIsModalOpen(true)}>
              <Beacon>
                <div className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full">
                  <UserIcon className="w-4 h-4 text-gray-800" />
                </div>
              </Beacon>
            </button>
          </div>
          <div className={avatarTextCn({ isFolded })}>
            <p className="text-sm text-gray-800 font-medium whitespace-nowrap">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
      {user && (
        <ProfileModal
          user={user}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

const avatarTextCn = cva(
  'flex-1 min-w-0 transition-all duration-200 ease-out',
  {
    variants: {
      isFolded: {
        true: 'w-0 opacity-0',
        false: 'w-full opacity-100',
      },
    },
  },
)
