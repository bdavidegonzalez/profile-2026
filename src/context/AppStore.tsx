import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type AppStore = {
  isSidebarOpen: boolean
  setSidebarOpen(open: boolean): void
  toggleSidebar(): void
}

const AppStoreContext = createContext<AppStore | null>(null)

function getInitialSidebarOpen() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(min-width: 768px)').matches
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarOpen)

  const value = useMemo<AppStore>(
    () => ({
      isSidebarOpen,
      setSidebarOpen: (open) => setIsSidebarOpen(open),
      toggleSidebar: () => setIsSidebarOpen((v) => !v),
    }),
    [isSidebarOpen],
  )

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppStore() {
  const ctx = useContext(AppStoreContext)
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider')
  return ctx
}

