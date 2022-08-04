import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parse from "parse";
import "bulma/css/bulma.css";
import Pastebin from "./pastebin/Pastebin";
import StreakBoard from "./StreakBoard/StreakBoard";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBook,
  faBottleWater,
  faBroom,
  faCartShopping,
  faCloudSun,
  faDumbbell,
  faGamepad,
  faHandSpock,
  faHardDrive,
  faHeadset,
  faHeadSideMask,
  faIceCream,
  faMagnifyingGlass,
  faMicrophone,
  faNewspaper,
  faPenToSquare,
  faPeopleRobbery,
  faScissors,
  faShirt,
  faShoePrints,
  faShower,
  faSpa,
  faTrash,
  faTrophy,
  faTv,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";

library.add(
  faTrophy,
  faMagnifyingGlass,
  faHardDrive,
  faBook,
  faHeadset,
  faDumbbell,
  faBroom,
  faCloudSun,
  faMicrophone,
  faNewspaper,
  faTv,
  faGamepad,
  faVideo,
  faPeopleRobbery,
  faShoePrints,
  faHandSpock,
  faScissors,
  faHeadSideMask,
  faShower,
  faCartShopping,
  faShirt,
  faTrash,
  faBottleWater,
  faPenToSquare,
  faIceCream,
  faSpa
);

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
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </BrowserRouter>
  </React.StrictMode>
);
