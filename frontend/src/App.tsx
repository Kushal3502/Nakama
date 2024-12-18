import { Routes } from "react-router";
import "./App.css";
import { Route } from "react-router";
import {
  AuthLayout,
  Details,
  Episodes,
  Home,
  Layout,
  Login,
  Popular,
  Recent,
  Register,
  Serach,
  Trending,
} from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="trending" element={<Trending />} />
          <Route path="popular" element={<Popular />} />
          <Route path="recent" element={<Recent />} />
          <Route path="search" element={<Serach />} />
          <Route path="info/:id" element={<Details />} />
          <Route path="watch/:id" element={<Episodes />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
