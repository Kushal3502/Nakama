import { Routes } from "react-router";
import "./App.css";
import { Navbar } from "./components";
import { Route } from "react-router";
import { AuthLayout, Home, Landing, Login, Register } from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Navbar />
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="home" element={<Home />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
