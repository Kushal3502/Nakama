import { Sidebar, Navbar } from "@/components";
import { Outlet } from "react-router";
import { useState } from "react";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      <div className={`flex-1 flex flex-col transition-all md:ml-[240px]`}>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 mt-16 md:mt-0 transition-all">
          <div className="w-full min-h-screen max-w-7xl mx-auto rounded-lg shadow-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
