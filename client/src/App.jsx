import { Outlet } from "react-router-dom"
import { Header, Sidebar } from "./component"
import { Providers } from "./context"
import Spinner from "./component/Spinner"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

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
