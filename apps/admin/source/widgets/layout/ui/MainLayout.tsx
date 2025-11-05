import { cva } from 'class-variance-authority'
import { PropsWithChildren, useState } from 'react'
import { Sidebar } from './Sidebar'

export const MainLayout = ({ children }: PropsWithChildren) => {
  const [isSidePinned, setIsSidePinned] = useState(true)

  return (
    <div className="flex min-w-[980px]">
      <Sidebar isPinned={isSidePinned} setIsPinned={setIsSidePinned} />
      <div className={contentCn({ isSidePinned })}>{children}</div>
    </div>
  )
}

const contentCn = cva(
  'flex-1 flex flex-col gap-6 p-6 pb-10 transition-all duration-200 ease-out',
  {
    variants: {
      isSidePinned: {
        true: 'ml-[225px]',
        false: 'ml-[69px]',
      },
    },
  },
)
