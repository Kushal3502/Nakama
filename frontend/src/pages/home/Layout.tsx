import { Sidebar, Navbar } from "@/components";
import { Outlet } from "react-router";
import { useState } from "react";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full flex overflow-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex-1 flex flex-col md:mt-20 mt-16">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 transition-all">
          <div className="w-full mx-auto rounded-lg shadow-lg md:px-24">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
