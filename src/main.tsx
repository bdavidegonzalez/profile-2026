import { App } from '@/app/App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppStoreProvider } from '@/context'
import { ContentProvider } from '@/content'
import { I18nProvider } from '@/i18n'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStoreProvider>
      <I18nProvider>
        <ContentProvider>
          <BrowserRouter basename="/profile-2026">
            <App />
          </BrowserRouter>
        </ContentProvider>
      </I18nProvider>
    </AppStoreProvider>
  </StrictMode>,
)
