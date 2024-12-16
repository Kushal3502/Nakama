import { useAuth } from "@/context/userContext";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { LogOut, Menu } from "lucide-react";

export interface NavbarProps {
  toggleSidebar: () => void;
}

function Navbar({ toggleSidebar }: NavbarProps) {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <div
      className="bg-white/10 backdrop-blur-lg h-16 flex items-center justify-between fixed 
    md:top-8 top-2 md:left-20 left-4 md:right-20 right-4 z-50 rounded-xl shadow-lg px-8"
    >
      <div className="flex justify-center items-center gap-1">
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          className=" p-2 bg-transparent"
        >
          <Menu />
        </Button>
        <Link to={"/home"}>
          <h1 className="text-white font-bold text-xl">Nakama</h1>
        </Link>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <p className=" md:block hidden">
            Hi, <span>{user?.username}</span>
          </p>
          <div className={`h-8 w-8 rounded-full ${user?.avatar}`}></div>
          <Button onClick={() => logout()}>
            <LogOut className="cursor-pointer" />
          </Button>
        </div>
      ) : (
        <div>
          <Button
            className="w-full md:w-auto bg-indigo-700 hover:bg-indigo-800 text-white rounded-md"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
