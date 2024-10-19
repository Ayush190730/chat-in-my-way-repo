import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider} from './Context/AuthContext'
import { ChatContextProvider } from "./Context/ChatContext"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <ChatContextProvider>
      <App/>
      </ChatContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)



