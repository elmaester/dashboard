import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bulma/css/bulma.css";
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
  faMagnifyingGlass,
  faMicrophone,
  faNewspaper,
  faPenToSquare,
  faPeopleRobbery,
  faScissors,
  faShirt,
  faShoePrints,
  faShower,
  faTrash,
  faTrophy,
  faTv,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

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
  faPenToSquare
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
