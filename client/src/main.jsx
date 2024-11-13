import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreateEventPage from './pages/CreateEventPage.jsx'
import Login from './pages/Login.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import SignUp from './pages/SignUp.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import OwnEvents from './pages/OwnEvents.jsx'
import EventPage from './pages/EventPage.jsx'
import SendInvitation from './pages/SendInvitation.jsx'
import SettingPage from './pages/SettingPage.jsx'
import SavedEvents from './pages/SavedEvents.jsx'
import LikedEvents from './pages/LikedEvents.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import YourFriend from './pages/YourFriend.jsx'
import ConnectRequest from './pages/ConnectRequest.jsx'
import InvitationPage from './pages/InvitationPage.jsx'
import MyFriendPage from './pages/MyFriendPage.jsx'
import EditAvatar from './pages/EditAvatar.jsx'
import SentInvitation from './pages/SentInvitation.jsx'
import AcceptInvitation from './pages/AcceptInvitation.jsx'
import ReceivedInvitation from './pages/ReceivedInvitation.jsx'
import { EventStepWrapper } from './wrapper/EventStepWrapper.jsx'
import { EventPageWrapper } from './wrapper/EventPageWrapper.jsx'
import Payment from './pages/Payment.jsx'
import CompletePage from './pages/CompletePage.jsx'
import OrganizerDetail from './pages/OrganizerDetail.jsx'
import ChatPage from './pages/chat/ChatPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='' element={<HomePage />} />
        <Route path='create-event' element={<CreateEventPage />} />
        <Route path="create-event/:eventType" element={<EventPageWrapper />}>
          <Route path=":step" element={<EventStepWrapper />} />
        </Route>
        <Route path='own-events' element={<OwnEvents />} />
        <Route path='event/:eventId' element={<EventPage />} />
        <Route path='organizer/:userId' element={<OrganizerDetail />} />
        <Route path='event/participants/:eventId' element={<SendInvitation />} />
        <Route path='settings' element={<SettingPage />} >
          <Route path='edit/avatar' element={<EditAvatar />} />
          <Route path='saved/events' element={<SavedEvents />} />
          <Route path='liked/events' element={<LikedEvents />} />
          <Route path='profile' element={<ProfilePage />} />

          <Route path='your-friends' element={<YourFriend />} >
            <Route path='request' element={<ConnectRequest />} />
            <Route path='invitation' element={<InvitationPage />} >
              <Route path='sent' element={<SentInvitation />} />
              <Route path='accept-or-reject' element={<AcceptInvitation />} />
              <Route path='received' element={<ReceivedInvitation />} />
            </Route>
            <Route path='myfriends' element={<MyFriendPage />} />
          </Route>
        </Route>
        <Route path='payment' element={<Payment />} />
        <Route path='return' element={<CompletePage />} />
        <Route path='chat' element={<ChatPage />} />
      </Route >
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
