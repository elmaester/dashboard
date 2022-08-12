import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parse from "parse";
import "bulma/css/bulma.css";
import Pastebin from "./pastebin/Pastebin";
import StreakBoard from "./StreakBoard/StreakBoard";
import Navbar from "./Navbar";
import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import Tasks from "./Tasks/Tasks";
import importFontAwesome from "./functions/importFontAwesome";

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
        </Routes>
      </>
    </BrowserRouter>
  </React.StrictMode>
);
