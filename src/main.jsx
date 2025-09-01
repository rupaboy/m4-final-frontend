import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { WorldProvider } from './context/WorldContext.jsx'
import { FetchStatusProvider } from './context/FetchStatusContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { RadioProvider } from './context/RadioContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { UiProvider } from './context/UiContext.jsx'
import { BrowserRouter } from 'react-router'
import RouterDom from './routes/RouterDom.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <UserProvider>
          <FetchStatusProvider>
            <RadioProvider>
              <WorldProvider>
                <ThemeProvider>
                  <UiProvider>

                      <RouterDom />

                  </UiProvider>
                </ThemeProvider>
              </WorldProvider>
            </RadioProvider>
          </FetchStatusProvider>
        </UserProvider>
      </NotificationProvider>
    </BrowserRouter>

  </StrictMode>,
)
