import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Detail } from "./pages/Detail";
import { AddEditBlog } from "./pages/AddEditBlog";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { UserProvider } from "./context/UserContext";
import { CategProvider } from "./context/CategContext";
import { PwReset } from "./pages/PwReset";
import { ConfirmProvider } from "material-ui-confirm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Profile } from "./pages/Profile";
import { useState } from "react";
import { Admin } from "./pages/Admin";

function App() {
  const [avatar,setAvatar]=useState(null)
  return (
    <div className="app">
    <BrowserRouter>
      <CategProvider>
        <UserProvider>
          <ConfirmProvider>
          <ToastContainer />
          <div className="app">
            <Navbar avatar={avatar} setAvatar={setAvatar}/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/create" element={<AddEditBlog />} />
              <Route path="/update/:id" element={<AddEditBlog />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/pwreset" element={<PwReset />} />
              <Route path="/profile" element={<Profile  setAvatar={setAvatar}/>} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          </ConfirmProvider>
        </UserProvider>
      </CategProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
