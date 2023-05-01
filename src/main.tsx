import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DataProvider } from './context/FormDataContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
)
