import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../store/uiSlice'
import { applyTheme } from '../store/localStorageMiddleware'
import { useEffect } from 'react'

export function useTheme() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return { theme, toggleTheme: handleToggle, isDark: theme === 'dark' }
}
