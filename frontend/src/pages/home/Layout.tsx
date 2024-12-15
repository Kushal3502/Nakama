import { Sidebar } from "@/components";
import { Outlet } from "react-router";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="flex-1 flex flex-col">
        <div
          className={`flex-1 overflow-y-auto p-4 md:p-6 transition-all mt-24`}
        >
          <div className="w-full min-h-screen max-w-7xl mx-auto rounded-lg shadow-lg">
            <Outlet />
          </div>
        </div>
      </div>
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed md:hidden top-4 left-4 bg-indigo-700 text-white p-2 rounded-full z-50 shadow-md"
      >
        <Menu size={20} />
      </Button>
    </div>
  );
}

export default Layout;
