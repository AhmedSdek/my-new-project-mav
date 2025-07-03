import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "./min.css";
import logoPhoto from "./log.webp";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { Button, ToggleButton, Tooltip } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { FavoriteBorder, FormatBold } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
function Navs() {
  const { i18n } = useTranslation();
  const lang = i18n.language; // هيطلع "ar" أو "en"
  const [value, loading, error] = useCollection(collection(db, "admin"));
  var arr = [];
  value &&
    value.docs.map((e) =>
      e.data().dev.map((it) => {
        if (!arr.includes(it.district) && it.district !== "") {
          arr.push(it.district);
        }
      })
    );
  const [ope, setOpe] = useState(false);
  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        data-bs-theme="dark"
        id="navs"
      >
        <Container>
          <Link aria-label="Home" to="/" style={{ width: "150px" }}>
            <img
              style={{ height: "42px", width: "150px" }}
              src={logoPhoto}
              alt=""
            />
          </Link>
          <Navbar.Toggle id="navbar-toggler" aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            style={{ justifyContent: "center" }}
          >
            <Nav>
              <Nav.Link as={Link} to="/" eventKey="0">
                Home
              </Nav.Link>
              {/* <Button sx={{ color: 'white', width: 'fit-content', p: '2px', minWidth: 'auto' }} onClick={() => i18n.changeLanguage('ar')}>Ar</Button>
              <Button sx={{ color: 'white', width: 'fit-content', p: '2px', minWidth: 'auto' }} onClick={() => i18n.changeLanguage('en')}>En</Button> */}
              <NavDropdown title="Districts" id="navbarScrollingDropdown">
                {arr.map((link, index) => {
                  return (
                    <NavDropdown.Item
                      as={Link}
                      key={index}
                      className="dropdown-item"
                      to={`findhome/${link}`}
                      eventKey="0"
                    >
                      {link}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <Nav.Link as={Link} to="/sell" eventKey="0">
                Sell-Rent
              </Nav.Link>
              <Nav.Link as={Link} to="/newlaunches" eventKey="0">
                New Launches
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" eventKey="0">
                Contact Us
              </Nav.Link>
              <Nav.Link as={Link} to="/about" eventKey="0">
                about
              </Nav.Link>
              <Nav.Link as={Link} to="/maverickdeals" eventKey="0">
                Maverick Deals
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            id="navbarScroll2"
            style={{ justifyContent: "end", flexGrow: 0 }}
          >
            <Nav>
              <Nav.Link as={Link} to="/favoriteList" eventKey="0">
                <Tooltip title="FavoriteList">
                  <FavoriteBorder />
                </Tooltip>
              </Nav.Link>
              <ToggleButton
                sx={{
                  color: 'white',
                  '&.Mui-selected': {
                    color: 'white',
                    backgroundColor: '#1976d2', // لون الخلفية عند selected
                  },
                }}
                onChange={() => {
                  i18n.changeLanguage(lang === "ar" ? "en" : "ar");
                }}
                value={lang} aria-label="bold">
                {lang === "ar" ? "عربي" : "English"}
              </ToggleButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default Navs;
