import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store'
import { hydrateFromStorage } from './store/localStorageMiddleware'
import App from './App.jsx'
import './index.css'

// Hydrate Redux from localStorage before rendering
hydrateFromStorage(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
