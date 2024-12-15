import { useState } from "react";
import { Home, TrendingUp, Star } from "lucide-react";
import { Button } from "./ui/button";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    { name: "Home", icon: <Home /> },
    { name: "Top Airing", icon: <TrendingUp /> },
    { name: "Popular", icon: <Star /> },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl flex flex-col gap-4 items-center fixed md:top-32 top-4 left-10 z-50 rounded-xl shadow-2xl p-4 md:w-60">
      {tabs.map((tab) => (
        <Button
          key={tab.name}
          variant="secondary"
          className={`w-full flex justify-start items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
            activeTab === tab.name
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg "
              : "bg-indigo-500/30 hover:bg-indigo-500/70 text-gray-200 hover:text-white"
          }`}
          onClick={() => setActiveTab(tab.name)}
        >
          <div className="text-white">{tab.icon}</div>
          <p className="font-medium text-sm md:text-base">{tab.name}</p>
        </Button>
      ))}
    </div>
  );
}

export default Sidebar;
