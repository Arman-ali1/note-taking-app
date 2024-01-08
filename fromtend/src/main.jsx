import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,justifyContent:"center" ,width:'100vw'}}>
  <App />
  </div>
    
  </React.StrictMode>,
)
