/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import AddLanguage from "views/AddLanguage";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import Scanner from "views/Scanner.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Handleliste from "views/Handleliste.js"
import Loggføring from "views/Loggføring";
import Register from "views/Register";
import Login from "views/Login";


var routes = [
  {
    path: "/dashboard",
    name: "Name_in_routes.js?",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/AddLanguage",
    name: "Legg til språk",
    icon: "nc-icon nc-bell-55",
    component: AddLanguage,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "Om oss",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Filter",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/handleliste",
    name: "Handleliste",
    icon: "nc-icon nc-tile-56",
    component: Handleliste,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/scanner",
    name: "Scanner",
    icon: "nc-icon nc-caps-small",
    component: Scanner,
    layout: "/admin",
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: "/admin",
  },
  {
    path: "/Loggføring",
    name: "Loggføring",
    icon: "nc-icon nc-bank",
    component: Loggføring,
    layout: "/admin",
  },
  {
    path: "/Registrer",
    name: "Registrer",
    icon: "nc-icon nc-bank",
    component: Register,
    layout: "/admin",
  },
  {
    path: "/Login",
    name: "Login",
    icon: "nc-icon nc-bank",
    component: Login,
    layout: "/admin",
  },
];
export default routes;
