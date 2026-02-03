import { NavLink } from 'react-router-dom'
import { useContent } from '@/content'
import { useAppStore } from '@/context'
import { modules, type ModuleId } from '@/config/modules'

type NavItem = {
  to: string
  icon: string
  label: string
  code: string
  module?: ModuleId
}

const navItems: NavItem[] = [
  { to: '/', icon: 'badge', code: '[ 01 ]', label: 'NAV_PROFILE' },
  { to: '/stack', icon: 'memory', code: '[ 02 ]', label: 'NAV_STACK', module: 'stack' },
  { to: '/trajectory', icon: 'timeline', code: '[ 03 ]', label: 'NAV_TRAJECTORY', module: 'trajectory' },
  { to: '/portfolio', icon: 'deployed_code', code: '[ 04 ]', label: 'NAV_PORTFOLIO', module: 'portfolio' },
  { to: '/contact', icon: 'mail', code: '[ 05 ]', label: 'NAV_CONTACT', module: 'contact' }
]

export function Navbar() {
  const { t } = useContent()
  const { setSidebarOpen } = useAppStore()

  const handleNavClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) setSidebarOpen(false)
  }

  return (
    <nav className="flex flex-col gap-2">
      {navItems
        .filter((item) => (item.module ? modules[item.module].enabled : true))
        .map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={handleNavClick}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 p-2 text-xs font-bold transition-all',
              isActive ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-primary/10 hover:text-primary',
            ].join(' ')
          }
          end={item.to === '/'}
        >
          <span className="material-symbols-outlined text-sm">{item.icon}</span>
          <span>
            {item.code} {t(item.label)}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}

