import React from "react";
import { Route, Routes } from "react-router-dom";
import ShowTask from "../Task/ShowTask";
import Register from "../Register/Register";
import Login from "./Login/Login";
import AssignedTask from "../Task/AssignedTask";

const Body = () => {
  return (
    <>
      <Routes>
        {localStorage.getItem("token") ? (
          <>
            <Route path="/" element={<ShowTask />} />
            <Route path="/showtask" element={<ShowTask />} />
            <Route path="/assigned_task" element={<AssignedTask />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Body;
