import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface LayoutContextValue {
  isSidebarPinned: boolean
  setIsSidebarPinned: (isSidebarPinned: boolean) => void

  isSidebarHover: boolean
  setIsSidebarHover: (isSidebarHover: boolean) => void
}

const LayoutContext = createContext<LayoutContextValue>(
  {} as LayoutContextValue,
)

export const LayoutProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarPinned, setIsSidebarPinned] = useState(true)
  const [isSidebarHover, setIsSidebarHover] = useState(false)

  return (
    <LayoutContext.Provider
      value={{
        isSidebarPinned,
        setIsSidebarPinned,
        isSidebarHover,
        setIsSidebarHover,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayout = () => {
  const context = useContext(LayoutContext)

  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }

  return context
}
