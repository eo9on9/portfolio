import { cn } from '@shared/util/cn'
import { Header } from '@widgets/layout/ui/Header'
import { PropsWithChildren } from 'react'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={containerCn}>
      <Header />
      <main className={mainCn}>{children}</main>
    </div>
  )
}

const containerCn = cn`pt-14`

const mainCn = cn`flex flex-col gap-6 pt-6 px-6 pb-[100px]`
