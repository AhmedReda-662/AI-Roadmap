import { createSlice } from '@reduxjs/toolkit'

// Default to dark (night learner). Honor a stored choice, then fall back to system,
// then dark. The learner's own explicit preference always wins.
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('ai-roadmap-state')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (parsed?.ui?.theme === 'dark' || parsed?.ui?.theme === 'light') return parsed.ui.theme
    } catch {}
  }
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'dark'
}

const initialState = {
  theme: getInitialTheme(),
  sidebarOpen: false,
  searchOpen: false,
  searchQuery: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false
    },
    openSearch: (state) => {
      state.searchOpen = true
    },
    closeSearch: (state) => {
      state.searchOpen = false
      state.searchQuery = ''
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
  },
})

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  closeSidebar,
  openSearch,
  closeSearch,
  setSearchQuery,
} = uiSlice.actions

export default uiSlice.reducer
