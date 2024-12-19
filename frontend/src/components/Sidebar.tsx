import { Home, TrendingUp, Star, Timer, TrendingUpDown, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { NavbarProps } from "./Navbar";
import { NavLink } from "react-router";

function Sidebar({ toggleSidebar }: NavbarProps) {
  const tabs = [
    { name: "Home", icon: <Home />, path: "" },
    { name: "Top Airing", icon: <TrendingUp />, path: "trending" },
    { name: "Popular", icon: <Star />, path: "popular" },
    { name: "Recently Added", icon: <Timer />, path: "recent" },
    { name: "Genres", icon: <TrendingUpDown />, path: "genres" },
    { name: "Favourites", icon: <Heart />, path: "likes" },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl flex flex-col gap-4 fixed top-20 md:top-28 left-4 w-60 z-40 p-4 rounded-lg">
      <div className="" />
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={`/${tab.path}`}
          onClick={toggleSidebar}
        >
          {({ isActive }) => (
            <Button
              variant="secondary"
              className={`w-full flex justify-start items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-indigo-500/30 hover:bg-indigo-500/70 text-gray-200 hover:text-white"
              }`}
            >
              <div className="text-white">{tab.icon}</div>
              <p className="font-medium text-sm md:text-base">{tab.name}</p>
            </Button>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
