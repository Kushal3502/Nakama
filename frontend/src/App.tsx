import { Routes } from "react-router";
import "./App.css";
import { Navbar } from "./components";
import { Route } from "react-router";
import { AuthLayout, Home, Landing, Layout, Login, Register } from "./pages";
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
        <Route path="home" element={<Layout />}>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
