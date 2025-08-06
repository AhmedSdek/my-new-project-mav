import "./home.css";
import Calc from "../Calc/Calc";
import { Box, Stack } from "@mui/material";
import im from "./im.png";
import im2 from "./im2.jpg";
import SahelMap from "../sahelMap/SahelMap";
import CityscapeHome from "../cityscape/CityscapeHome";
import NewLaunches from "../newLaunche/NewLaunches";
import Developers from "../developers/Developers";
import Deals from "../deals/Deals";
import Form from "../form/Form";
import Search from "../search/Search";
import { useTranslation } from "react-i18next";
import NorthCoastProjects from "../north Coast Projects/NorthCoastProjects";
function Home() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div>
      <Box
        component="header"
        sx={{
          position: "relative",
          backgroundColor: "white",
          backgroundImage: { xs: `url(${im2})`, md: `url(${im})` },
        }}
        className="home-header"
      >
        <div
          className="header-main"
          style={{ textAlign: "start", width: "40%", margin: "35px auto 0 " }}
        >
          <h1
            className="hed1"
            style={{ color: "white", lineHeight: "1.8", width: "fit-content" }}
          >
            <mark
              style={{
                backgroundColor: "rgb(255 145 77 / 87%)",
                borderRadius: "6px",
                fontWeight: "bold",
                color: "#1e4164",
              }}
            >
              {lang === "ar" ? "دعنا" : "Let us"}
            </mark>
          </h1>
          <h2
            className="hed2"
            style={{
              color: "white",
              fontWeight: "bold",
              margin: "0",
              fontSize: "40px",
            }}
          >
            {lang === "ar" ? "نساعدك في" : "Help You To Make"}
          </h2>
          <h2
            className="hed3"
            style={{
              textAlign: "end",
              fontWeight: "bold",
              color: "white",
              margin: "5px 0  0 0",
              fontSize: "40px",
            }}
          >
            {lang === "ar" ? "الحركه" : "The Move"}
          </h2>
          <Search />
        </div>
      </Box>
      <SahelMap />
      <CityscapeHome />
      <NorthCoastProjects />
      <NewLaunches />
      <Developers />
      <Deals />
      <Stack sx={{ marginBottom: "15px" }}>
        <Form
          hedText="Need Expert Advice ?"
          text2="Fill out the form and one of our property consultants will contact you."
          Alert="Thank you. I will get back to you as soon as possible."
        />
      </Stack>
      <Calc />
      {/* <HomePup pup={pup} setPup={setPup} /> */}
    </div>
  );
}
export default Home;
