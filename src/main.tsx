import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Parse from "parse";
import "bulma/css/bulma.css";
import Pastebin from "./pastebin/Pastebin";
import StreakBoard from "./StreakBoard/StreakBoard";
import Navbar from "./Navbar";
import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import Tasks from "./Tasks/Tasks";
import importFontAwesome from "./functions/importFontAwesome";
import userIsLoggedIn from "./authentication/functions/userIsLoggedIn";

importFontAwesome();

Parse.initialize(
  import.meta.env.VITE_PARSE_APPLICATION_ID,
  import.meta.env.VITE_PARSE_MASTER_KEY
);
Parse.serverURL = import.meta.env.VITE_PARSE_SERVER_URL;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route
            path="/pastebin"
            element={
              <RequireAuth>
                <Pastebin />
              </RequireAuth>
            }
          />
          <Route
            path="/streakboard"
            element={
              <RequireAuth>
                <StreakBoard />
              </RequireAuth>
            }
          />
          <Route
            path="/tasks"
            element={
              <RequireAuth>
                <Tasks />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Navigate to={userIsLoggedIn() ? "/pastebin" : "/login"} />
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  </React.StrictMode>
);
