import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "./min.css";
import logoPhoto from "./log.webp";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { Button, Stack, ToggleButton, Tooltip } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { FavoriteBorder, FormatBold } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlobal } from "../context/GlobalContext";
function Navs() {
  const { i18n } = useTranslation();
  const lang = i18n.language; // هيطلع "ar" أو "en"
  const { country, setCountry } = useGlobal();
  // console.log(country);
  // console.log(lang)
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
  const handleToggleLanguage = () => {
    window.location.reload();
    const newLang = lang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang); // تحطها صريح عشان مفيش حاجة تلعب فيها
  };
  const handleToggleCountry = () => {
    const newCountry =
      country.en === "egypt"
        ? { en: "uae", ar: "الامارات" }
        : { en: "egypt", ar: "مصر" };
    setCountry(newCountry);
    localStorage.setItem("selectedCountry", JSON.stringify(newCountry));
  };

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
            <Nav style={{ fontSize: "15px" }}>
              <Nav.Link as={Link} to="/" eventKey="0">
                {lang === "ar" ? "الصفحه الرئيسيه " : "Home"}
              </Nav.Link>
              <NavDropdown
                title={lang === "ar" ? "المناطق" : "Districts"}
                id="navbarScrollingDropdown"
              >
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
                {lang === "ar" ? "بيع-إيجار" : "Sell-Rent"}
              </Nav.Link>
              <Nav.Link as={Link} to="/newlaunches" eventKey="0">
                {lang === "ar" ? "وحدات جديده" : "New Launches"}
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" eventKey="0">
                {lang === "ar" ? "اتصل بنا" : "Contact Us"}
              </Nav.Link>
              <Nav.Link as={Link} to="/about" eventKey="0">
                {lang === "ar" ? "عنا" : "About"}
              </Nav.Link>
              <Nav.Link as={Link} to="/maverickdeals" eventKey="0">
                {lang === "ar" ? "عروض مافريك" : "Maverick Deals"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            id="navbarScroll2"
            style={{ justifyContent: "end", flexGrow: 0 }}
          >
            <Nav
              style={{
                gap: "10px",
              }}
            >
              <Nav.Link
                style={{ width: "100%" }}
                as={Link}
                to="/favoriteList"
                eventKey="0"
              >
                <Tooltip title="FavoriteList">
                  <FavoriteBorder />
                </Tooltip>
              </Nav.Link>
              <Stack sx={{ flexDirection: "row" }}>
                <ToggleButton
                  sx={{
                    color: "white",
                    p: 1,
                    width: "100%",
                    border: "none",
                    "&.Mui-selected": {
                      color: "white",
                      backgroundColor: "#1976d2",
                      p: 1,
                    },
                  }}
                  onClick={handleToggleLanguage}
                  value={lang}
                  aria-label="language toggle"
                >
                  {lang === "en" ? "عربي" : "English"}
                </ToggleButton>
                <ToggleButton
                  sx={{
                    color: "white",
                    p: 1,
                    width: "100%",
                    border: "none",
                    "&.Mui-selected": {
                      color: "white",
                      backgroundColor: "#1976d2",
                      p: 1,
                    },
                  }}
                  onClick={handleToggleCountry}
                  value={country}
                  aria-label="language toggle"
                >
                  {lang === "en"
                    ? country.en === "egypt"
                      ? "UAE"
                      : "Egypt"
                    : country.en === "egypt"
                    ? "الامارات"
                    : "مصر"}
                </ToggleButton>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default Navs;
