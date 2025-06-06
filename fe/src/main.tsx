import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CtxProvider } from './components/Global/Global.tsx'
import { ThemeProvider } from './components/Theme/Theme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CtxProvider>
      <ThemeProvider>
    <App />
      </ThemeProvider>
    </CtxProvider>
  </StrictMode>,
)
