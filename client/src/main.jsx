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
import CreateWorkShopEvent from './pages/CreateWorkShopEvent.jsx'
import CreateTicketEvent from './pages/CreateTicketEvent.jsx'
import CreateBusinessEvent from './pages/CreateBusinessEvent.jsx'
import OwnEvents from './pages/OwnEvents.jsx'
import EventPage from './pages/EventPage.jsx'
import SendInvitation from './pages/SendInvitation.jsx'
import SettingPage from './pages/SettingPage.jsx'
import EditAvatar from './pages/EditAvatar.jsx'
import SavedEvents from './pages/SavedEvents.jsx'
import LikedEvents from './pages/LikedEvents.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='' element={<HomePage />} />
        <Route path='create-event' element={<CreateEventPage />} />
        <Route path='create-event/create-private-event' element={<CreatePriEvent />} />
        <Route path='create-event/create-public-event' element={<CreatePubEvent />} />
        <Route path='create-event/create-workshop-event' element={<CreateWorkShopEvent />} />
        <Route path='create-event/create-ticket-event' element={<CreateTicketEvent />} />
        <Route path='create-event/create-business-event' element={<CreateBusinessEvent />} />
        <Route path='own-events' element={<OwnEvents />} />
        <Route path='event/:eventId' element={<EventPage />} />
        <Route path='event/send/invitation/:eventId' element={<SendInvitation />} />
        <Route path='settings' element={<SettingPage />} >
          <Route path='edit/avatar' element={<EditAvatar />} />
          <Route path='saved/events' element={<SavedEvents />} />
          <Route path='liked/events' element={<LikedEvents />} />
        </Route>
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
