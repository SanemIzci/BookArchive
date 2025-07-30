import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../layout/Navbar.jsx'
import Footer from '../layout/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>  
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
