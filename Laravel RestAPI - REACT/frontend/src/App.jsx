import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SkillsCreate from "./pages/SkillsCreate";
import SkillsEdit from "./pages/SkillsEdit";

import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";

import { SkillProvider } from "./context/SkillContext";


function App() {
  return (
    <SkillProvider>
    <div className="bg-green-300 min-h-screen">
        <Routes>
          <Route element={<AuthLayout/>} >
            <Route path="/" element={<Home/>} />
            <Route path="/skills/create" element={<SkillsCreate/>} />
            <Route path="/skills/:id/edit" element={<SkillsEdit/>} />
          </Route>
          <Route element={<GuestLayout/>} >
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/password-reset/:token" element={<ResetPassword/>} />
          </Route>
        </Routes>
    </div>
    </SkillProvider>
  )
}

export default App;
