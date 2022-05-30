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
import { t } from "i18next";
import react from "react";
import { useTranslation } from "react-i18next";
import Logvisning from "views/Logvisning";

var routes = [
  {
    path: "/dashboard",
    name: "price_comparison",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/addlanguage",
    name: "add_language",
    icon: "nc-icon nc-world-2",
    component: AddLanguage,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "ABOUT_US",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "ITEMS",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/handleliste",
    name: "CART",
    icon: "nc-icon nc-tile-56",
    component: Handleliste,
    layout: "/admin",
  },
  {
    path: "/scanner",
    name: "SCANNER",
    icon: "nc-icon nc-caps-small",
    component: Scanner,
    layout: "/admin",
  },
  {
    path: "/log",
    name: "LOG",
    icon: "nc-icon nc-bank",
    component: Loggføring,
    layout: "/admin",
  },
  {
    path: "/registrer",
    name: "REGISTRER",
    icon: "nc-icon nc-single-02",
    component: Register,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "SIGN_IN",
    icon: "nc-icon nc-single-02",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/Logvisning",
    name: "show_log",
    icon: "nc-icon nc-bank",
    component: Logvisning,
    layout: "/admin",
  },
];


export default routes;
