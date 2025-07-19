import "./App.css";
import "animate.css";
import Navs from "./comp/Nave";
import Footer from "./comp/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import Dashboard from "./comp/admin/Dashboard";
import ReSale from "./comp/admin/reSale/ReSale";
import SaleData from "./comp/admin/SaleData";
import FindHomeDetails from "./comp/Find a Home/FindHomeDetails";
import SellDetails from "./comp/admin/SellDetails";
import FindDetails from "./comp/Find a Home/FindDetails";
import NewLaunchesForm from "./comp/admin/newLaunchesform/NewLaunchesForm";
import FindCompDetails from "./comp/Find a Home/FindCompDetails";
import MavLoading from "./comp/Loading/MavLoading";
import EditDeveloper from "./comp/admin/Edit/Developer/EditDeveloper";
import EditDealdetails from "./comp/admin/Edit/Deals/EditDealdetails";
import Editdevdetails from "./comp/admin/Edit/Developer/Editdevdetails";
import EditDeals from "./comp/admin/Edit/Deals/EditDeals";
import Editluanches from "./comp/admin/Edit/Luanches/Editluanches";
import Editluanchesdetails from "./comp/admin/Edit/Luanches/Editluanchesdetails";
import Err from "./comp/Err/Err";
import Cityscape from "./comp/admin/cityscape/Cityscape";
import EditCity from "./comp/admin/Edit/City/EditCity";
import Inventory from "./comp/admin/inventory/Inventory";
import InventoryDetails from "./comp/inventory/InventoryDetails";
import DeveloperForm from "./comp/admin/developerForm/DeveloperForm";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompoundsForm from "./comp/admin/Compound/CompoundsForm";
import EditCompound from "./comp/admin/Edit/Compound/EditCompound";
import EditCompoundDetails from "./comp/admin/Edit/Compound/EditCompoundDetails";
import EditCompoundProject from "./comp/admin/Edit/Compound/EditCompoundProject";
import LoginForm from "./Auth/Login";
import RegisterForm from "./Auth/SignUp";
import EditInventory from "./comp/admin/Edit/Inventory/EditInventory";
import EditinventoryDetails from "./comp/admin/Edit/Inventory/EditinventoryDetails";
import EditcityDetails from "./comp/admin/Edit/City/EditcityDetails";
import SahelForm from "./comp/admin/sahelForm/SahelForm";
import { useGlobal } from "./context/GlobalContext";
import EditSahel from "./comp/admin/Edit/sahel/EditSahel";
import EditSahelDetails from "./comp/admin/Edit/sahel/EditSahelDetails";
import Home from "./pages/homeSections/home/Home";
import SahelMapPage from "./pages/sahel Page/SahelMapPage";
import CityscapeProjects from "./pages/cityscape Page/CityscapeProjects";
import NewLaunches from "./pages/New Launches Page/NewLaunches";
import NewLaunchDetails from "./pages/New Launches Page/NewLaunchDetails";
import Developers from "./pages/developers Page/Developers";
import DeveloperDetails from "./pages/developers Page/DeveloperDetails";
import ProjectDe from "./pages/developers Page/ProjectDe";
import MaverickDeals from "./pages/deals Page/MaverickDeals";
import DealDetails from "./pages/deals Page/DealDetails";
import AboutUs from "./pages/about page/AboutUs";
import ContactUs from "./pages/Contact Page/ContactUs";
import Sell from "./pages/sell-rent Page/Sell";
import FavoriteList from "./pages/FavList page/FavoriteList";
function App() {
  const { i18n } = useTranslation();
  const { country, setCountry } = useGlobal();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(
    localStorage.getItem("mtTheme") === null
      ? "light"
      : localStorage.getItem("mtTheme")
  );
  const darkTheme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f0f2f5",
            },
          }
        : {
            background: {
              default: "#000000eb",
            },
          }),
    },
  });
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  useEffect(() => {
    setLoading(true);
    setLoading(false);
    // getDevelopers()
    // setTimeout(() => {
    // }, 2000)
  }, []);
  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      setCountry(JSON.parse(savedCountry));
    } else {
      // قيمة افتراضية "مصر"
      const defaultCountry = { en: "egypt", ar: "مصر" };
      setCountry(defaultCountry);
      localStorage.setItem("selectedCountry", JSON.stringify(defaultCountry));
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <MavLoading />
          </div>
        ) : (
          <>
            <Navs />
            <ToastContainer />
            <Routes>
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<SaleData />} />
                <Route path="developerform" element={<DeveloperForm />} />
                <Route path="resale" element={<ReSale />} />
                <Route path="compound" element={<CompoundsForm />} />
                <Route path="editcompound" element={<EditCompound />} />
                <Route
                  path="editcompound/:editcompoundId"
                  element={<EditCompoundDetails />}
                />
                <Route
                  path="editcompound/:editcompoundId/:editcompoundprojId"
                  element={<EditCompoundProject />}
                />
                <Route path="inventory" element={<Inventory />} />
                <Route path="editinventory" element={<EditInventory />} />
                <Route
                  path="editinventory/:inventoryId"
                  element={<EditinventoryDetails />}
                />
                <Route path="details/:id" element={<SellDetails />} />
                <Route path="newlaunchesform" element={<NewLaunchesForm />} />
                <Route path="editDeveloper" element={<EditDeveloper />} />
                <Route
                  path="editDeveloper/:editDeveloperId"
                  element={<Editdevdetails />}
                />
                <Route path="editDeals" element={<EditDeals />} />
                <Route
                  path="editDeals/:editeDealdetailsId"
                  element={<EditDealdetails />}
                />
                <Route path="editluanches" element={<Editluanches />} />
                <Route
                  path="editluanches/:editluanchesdetailsId"
                  element={<Editluanchesdetails />}
                />
                <Route path="cityscape" element={<Cityscape />} />
                <Route path="editcity" element={<EditCity />} />
                <Route
                  path="editcity/:editcityId"
                  element={<EditcityDetails />}
                />
                <Route path="northcoast" element={<SahelForm />} />
                <Route path="editsahel" element={<EditSahel />} />
                <Route
                  path="editsahel/:sahelid"
                  element={<EditSahelDetails />}
                />
              </Route>

              <Route path="findhome" element={<FindHomeDetails />}>
                <Route path=":districtid" element={<FindDetails />} />
                <Route
                  path=":districtid/:findprojId"
                  element={<FindCompDetails />}
                />
              </Route>
              <Route path="newlaunches" element={<NewLaunches />} />
              <Route
                path="newlaunches/:launchId"
                element={<NewLaunchDetails />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/favoriteList" element={<FavoriteList />} />
              <Route path="/sahelmap" element={<SahelMapPage />} />
              <Route
                path="/cityscapeprojects"
                element={<CityscapeProjects />}
              />
              <Route path="/maverickdeals" element={<MaverickDeals />} />
              <Route path="/maverickdeals/:dealId" element={<DealDetails />} />
              <Route path="/*" element={<Err />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/developers/:devId" element={<DeveloperDetails />} />
              <Route
                path="/developers/:devId/:projId"
                element={<ProjectDe />}
              />
              <Route
                path="/developers/:devId/:projId/:compId"
                element={<InventoryDetails />}
              />
            </Routes>
            <Footer />
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
