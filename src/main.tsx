import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App children={<p className='text-white'>Hello I am children component</p>} />
  </StrictMode>,
)
