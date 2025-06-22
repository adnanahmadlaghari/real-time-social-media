import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CtxProvider } from './components/Global/Global.tsx'
import { ThemeProvider } from './components/Theme/Theme.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <CtxProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </CtxProvider>
    </BrowserRouter>
  </StrictMode>,
)
