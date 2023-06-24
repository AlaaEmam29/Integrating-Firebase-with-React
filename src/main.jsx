import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/style/index.css'
import App from './Components/App/App'
import { FirebaseContextProvider } from './Context/Firebase/context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContextProvider>
        <App/>
    </FirebaseContextProvider>
  </React.StrictMode>,
)
