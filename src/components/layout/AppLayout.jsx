import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'
import MobileNavDrawer from './MobileNavDrawer'
import { useSelector, useDispatch } from 'react-redux'
import { closeSidebar } from '../../store/uiSlice'

export default function AppLayout() {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen)
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen flex">
      {/* Fixed acrylic backdrop — the atlas map behind the glass */}
      <div className="app-backdrop" aria-hidden="true" />

      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile header */}
      <MobileHeader />

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => dispatch(closeSidebar())}
          />
          <MobileNavDrawer />
        </div>
      )}

      {/* Main content — a frosted pane floating over the map */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="glass-panel rounded-2xl px-5 sm:px-8 lg:px-10 py-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
