import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globalStyles.css'
import AuthContextProvider from './components/SessionVerification/AuthContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
)
