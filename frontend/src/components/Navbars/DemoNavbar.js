/*
Navigasjonslinje på toppen. Inneholder språkvalg og viser om du er logget inn
*/
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  CardHeader,
} from "reactstrap";
import i18next from "i18next";
import routes from "routes.js";
import { useState } from "react/cjs/react.production.min";
import jsonwebtoken from "jsonwebtoken"; // for å identifisere bruker

import languages from "../../assets/available_languages";
import { useTranslation } from "react-i18next";

function LagSpråkJSX(props) {
  return (
    languages.map(({code, name, country_code}) => (
      <DropdownItem key={code} tag="a" onClick={() => {
        i18next.changeLanguage(code)
        window.location.reload(false);
      }}>{name}</DropdownItem>
    ))
  )
}

function LoggetInnSomJSX(props) {
  const {t} = useTranslation();
  if (localStorage.getItem('token')) {
    return (
      <CardHeader className="text-right user-logged-in-text">
            {t('user_logged_in_as')}{jsonwebtoken.decode(localStorage.getItem('token')).epost}
      </CardHeader>
    )
  } else return null
}

/**
 * Denne funksjonen følger med malen Paper Dashboard React. Gruppe 12 har kun endret logo/ navn, og lagt
 * til et valg om å bytte språk
 * 
 * @param {*} props 
 * @returns 
 */
function Header(props) {
  const {t} = useTranslation();
  const [språk, setSpråk] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    let brandName = "Prisjeger";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <LoggetInnSomJSX t={t} ></LoggetInnSomJSX>
            <Nav navbar>
              <Dropdown
                nav
                isOpen={dropdownOpen}
                toggle={(e) => dropdownToggle(e)}               
              >
                <DropdownToggle caret nav>{t('choose_lng')}{' '}
                  <i className="nc-icon nc-world-2" />
                </DropdownToggle>
                <DropdownMenu right>
                  <LagSpråkJSX språk={språk} setSpråk={setSpråk}></LagSpråkJSX>
                </DropdownMenu>
              </Dropdown>
            </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
