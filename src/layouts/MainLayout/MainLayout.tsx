import { Outlet } from 'react-router-dom'
import { LanguageSwitcher, Navbar } from '@/components'
import { useContent } from '@/content'
import { useAppStore } from '@/context'

export function MainLayout() {
  const { t } = useContent()
  const { isSidebarOpen, setSidebarOpen, toggleSidebar } = useAppStore()

  return (
    <>
      <div className="scanline" />

      <div className="relative flex min-h-screen w-full holographic-grid">
        <button
          type="button"
          className={[
            'fixed left-4 top-4 z-[60] rounded border border-primary/20 bg-black/60 p-2 text-primary md:hidden',
            isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100',
          ].join(' ')}
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <button
          type="button"
          className={[
            'fixed inset-0 z-40 bg-black/70 backdrop-blur-[1px] transition-opacity md:hidden',
            isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          ].join(' ')}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu overlay"
        />

        <aside
          className={[
            'fixed left-0 top-0 z-50 flex h-screen w-80 flex-col justify-between border-r border-primary/20 bg-black/90 p-8 transition-transform',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'md:translate-x-0',
          ].join(' ')}
        >
          <div className="space-y-12">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
                <div>
                  <h2 className="text-sm font-bold tracking-tighter text-white">{t('SYSTEM_ID')}</h2>
                  <p className="text-xs text-primary/70">{t('ARCHITECT_V2.0')}</p>
                </div>
              </div>
              <LanguageSwitcher />
            </div>

            <div className="space-y-4">
              <div className="relative h-24 w-24 border-2 border-primary/30 p-1">
                <div className="h-full w-full bg-black/40" />
                <div className="absolute -bottom-2 -right-2 bg-primary px-2 py-0.5 text-[10px] font-bold text-black">
                  {t('ACTIVE')}
                </div>
              </div>

              <div>
                <h1 className="glow-text text-2xl font-bold leading-none text-primary">{t('PROFILE_ROLE_TITLE')}</h1>
                <p className="mt-2 text-xs leading-relaxed text-gray-400 uppercase tracking-widest">
                  {t('PROFILE_SPECIALIZATION')}
                </p>
              </div>
            </div>

            <Navbar />
          </div>

          <div className="space-y-4">

            <div className="text-center text-[10px] text-primary/40 tracking-tighter">
              {t('SECURITY_STATUS')}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 md:ml-80 md:p-8">
          <Outlet />
        </main>
      </div>
    </>
  )
}

