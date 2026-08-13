const STORAGE_KEY = 'ai-roadmap-state'
let saveTimeout = null

export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action)

  // Apply theme when theme actions fire
  if (action.type === 'ui/toggleTheme' || action.type === 'ui/setTheme') {
    const theme = action.payload || (store.getState().ui.theme === 'dark' ? 'light' : 'dark')
    applyTheme(action.type === 'ui/toggleTheme' ? (store.getState().ui.theme === 'dark' ? 'light' : 'dark') : theme)
  }

  // Debounce localStorage writes to 500ms
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    try {
      const state = store.getState()
      const toSave = {
        progress: state.progress,
        ui: { theme: state.ui.theme },
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (e) {
      console.warn('Failed to save to localStorage:', e)
    }
  }, 500)

  return result
}

export function hydrateFromStorage(store) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      // No saved state — detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark ? 'dark' : 'light')
      return
    }
    const saved = JSON.parse(raw)
    if (saved.progress) {
      store.dispatch({ type: 'progress/hydrate', payload: saved.progress })
    }
    if (saved.ui?.theme) {
      store.dispatch({ type: 'ui/setTheme', payload: saved.ui.theme })
    }
    applyTheme(saved.ui?.theme || 'dark')
  } catch (e) {
    console.warn('Failed to hydrate from localStorage:', e)
    applyTheme('dark')
  }
}

export function applyTheme(theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  // Body colors come from CSS tokens; here we only toggle the class + a no-flash
  // background so first paint matches the intended palette.
  document.body.style.backgroundColor = theme === 'dark' ? 'var(--color-slate-950)' : 'var(--color-paper)'
}
