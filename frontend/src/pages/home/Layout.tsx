import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="flex-1 flex flex-col">
        <div
          className={`flex-1 overflow-y-auto p-4 md:p-6 transition-all`}
        >
          <div className="w-full min-h-screen max-w-7xl mx-auto rounded-lg shadow-lg mt-24">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
