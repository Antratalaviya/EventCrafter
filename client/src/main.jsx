import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreateEventPage from './pages/CreateEventPage.jsx'
import CreatePriEvent from './pages/CreatePriEvent.jsx'
import Login from './pages/Login.jsx'
import Protected from './pages/Protected.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import SignUp from './pages/SignUp.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import CreatePubEvent from './pages/CreatePubEvent.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='' element={<HomePage />} />
        <Route path='create-event' element={<CreateEventPage />} />
        <Route path='create-event/create-private-event' element={<CreatePriEvent />} />
        <Route path='create-event/create-public-event' element={<CreatePubEvent />} />
      </Route>
      <Route path='/sign-in' element={<Login />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='*' element={<PageNotFound />} />
    </>


  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
