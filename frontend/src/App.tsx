import { Routes } from "react-router";
import "./App.css";
import { Navbar } from "./components";
import { Route } from "react-router";
import { Landing } from "./pages";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Navbar />
      <Routes>
        <Route path="" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
