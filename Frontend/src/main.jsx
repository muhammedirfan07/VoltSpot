import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Contextapi from './context/ContextAPI.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contextapi>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Contextapi>
  </StrictMode>,
)
