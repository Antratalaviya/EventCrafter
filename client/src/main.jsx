import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Abc from './component/Abc.jsx'
import CreateEventPage from './pages/CreateEventPage.jsx'
import CreatePriEvent from './pages/CreatePriEvent.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<HomePage />} />
      <Route path='/create-event' element={<CreateEventPage />} />
      <Route path='/create-private-event' element={<CreatePriEvent />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
