import { NavLink, useLocation } from 'react-router'
import { useTheme } from '../../hooks/useTheme'
import { useProgress } from '../../hooks/useProgress'
import { useDispatch } from 'react-redux'
import { openSearch } from '../../store/uiSlice'
import Logo from '../ui/Logo'

const navItems = [
  {
    to: '/roadmap',
    label: 'Roadmap',
    key: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  },
  {
    to: '/dashboard',
    label: 'Dashboard',
    key: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    to: '/projects',
    label: 'Projects',
    key: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  },
  {
    to: '/specialization',
    label: 'Specialize',
    key: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
]

export default function Sidebar() {
  const { theme, toggleTheme, isDark } = useTheme()
  const { overallProgress } = useProgress()
  const dispatch = useDispatch()
  const location = useLocation()

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-slate-50/80 dark:bg-slate-950/60 backdrop-blur border-r border-slate-200 dark:border-slate-800/60 z-30">
      {/* Brand */}
      <div className="px-5 py-6 border-b border-slate-200 dark:border-slate-800/60">
        <NavLink to="/" className="flex items-center gap-3 group">
          <Logo className="w-9 h-9" />
          <span className="leading-none">
            <span className="block font-display text-base font-semibold text-slate-900 dark:text-white tracking-tight">
              Roadmap
            </span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 mt-1">
              to AI Engineering
            </span>
          </span>
        </NavLink>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <button
          onClick={() => dispatch(openSearch())}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors bg-white dark:bg-slate-900/40"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search</span>
          <kbd className="ml-auto text-[11px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400">⌘K</kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-2 pb-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/[0.03]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`w-0.5 h-5 rounded-full transition-all duration-200 -ml-3 -translate-x-1 ${
                    isActive ? 'bg-primary-500 w-0.5' : 'bg-transparent'
                  }`}
                />
                <svg
                  className={`w-5 h-5 transition-colors ${isActive ? 'text-primary-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.key} />
                </svg>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Instrument footer — progress rail + toggle */}
      <div className="px-5 py-5 border-t border-slate-200 dark:border-slate-800/60 space-y-5">
        {/* Progress gauntlet */}
        <div>
          <div className="flex items-end justify-between mb-2.5">
            <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              Ascent
            </span>
            <span className="font-display text-lg leading-none text-slate-900 dark:text-white">
              {overallProgress}<span className="text-[11px] text-slate-400">%</span>
            </span>
          </div>
          {/* Route rail: station ticks along the line */}
          <div className="relative h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-visible">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
            You are here: {location.pathname.split('/')[1] || 'start'}
          </div>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-white/[0.03] hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <span className="text-base leading-none">{isDark ? '☼' : '☾'}</span>
          <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
          <span className="ml-auto text-[11px] text-slate-300 dark:text-slate-600">{theme}</span>
        </button>
      </div>
    </aside>
  )
}