import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 bg-gray-100 dark:bg-slate-900 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;