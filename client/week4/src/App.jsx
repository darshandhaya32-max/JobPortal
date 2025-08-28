import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Components/Home";
import CreateJobPost from "./pages/Components/CreateJobPost";
import Application from "./pages/Components/Application";
import Login from "./pages/Authentication/Login";
import Signin from "./pages/Authentication/Signin";
import NavBar from "./pages/Components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./pages/Components/Update";
import MyPosts from "./pages/Components/MyPosts";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateJobPost />} />
        <Route path="/apply/:id" element={<Application />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/myposts/:id" element={<MyPosts/>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
