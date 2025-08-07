import Navbar from '../layout/Navbar.jsx'
import Footer from '../layout/Footer.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-64 w-[1/5] flex flex-col">
        <Navbar />
      </aside>

      {/* Main Content + Footer */}
      <div className="flex-1 flex flex-col bg-white min-h-screen">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
