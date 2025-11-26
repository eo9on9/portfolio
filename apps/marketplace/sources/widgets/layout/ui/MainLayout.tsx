import { Header } from '@widgets/layout/ui/Header'
import { PropsWithChildren } from 'react'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="pt-14">
      <Header />
      <main className="flex flex-col gap-6 max-w-[1280px] mx-auto pt-6 px-6 pb-[100px]">
        {children}
      </main>
    </div>
  )
}
