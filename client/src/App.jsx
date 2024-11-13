import { Outlet } from "react-router-dom"
import { Header, Sidebar } from "./component"
import { Providers } from "./context"

import Spinner from "./component/Spinner"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { io } from "socket.io-client"
import config from "./config/config";
import { getItem } from "./utils/localStorageUtility";
import { CONSTS } from "./utils/consts";
import { useDispatch } from "react-redux";
import { setOnlineUsers, setSocketConnection } from "./store/ChatSlice";



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const socketConnection = io(config.apiUrl, {
      auth: {
        token: getItem(CONSTS.ACCESS_TOKEN)
      },
    })

    dispatch(setSocketConnection(socketConnection))

    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnlineUsers(data))
    })
    return () => {
      socketConnection.disconnect()
    }
  }, [])

  return (
    <Providers>
      <ToastContainer theme="dark" limit={1} />
      <div className="h-screen w-screen flex flex-row overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 bg-background">
          <Header />
          {<Outlet /> ? <Outlet /> : <Spinner className={"absolute top-1/2 left-1/2"} />}
        </div>
      </div>
    </Providers>
  )
}

export default App
