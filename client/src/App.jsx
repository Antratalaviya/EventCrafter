import { Outlet } from "react-router-dom"
import { Header, Sidebar } from "./component"
import { Providers } from "./component/context"

function App() {

  return (
    <Providers>
      <div className="h-screen w-screen flex flex-row overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 bg-background">
          <Header />
          <Outlet />
        </div>
      </div>
    </Providers>
  )
}

export default App
