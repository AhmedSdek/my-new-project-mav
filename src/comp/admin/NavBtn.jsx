import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Stack } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function NavBtn() {
  const { i18n } = useTranslation();
  const lang = i18n.language; // هيطلع "ar" أو "en"
  const [open, setOpen] = React.useState(false);
  const [user] = useAuthState(auth);
  const nav = useNavigate();
  const containerRef = useRef(null);
  const adminData = [
    "arB4bTAtCiaMCBprrnOTRz6YbmT2",
    "YZia9oRhhzdNFG1JOXteZOpcdw83",
  ];
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const listData = [
    {
      text: lang === "ar" ? "المطور" : "Developer",
      to: "developerform",
    },
    {
      text: lang === "ar" ? "وحدات جديدة" : "New Launches",
      to: "newlaunchesform",
    },
    {
      text: lang === "ar" ? "كومباوند" : "Compound",
      to: "database",
    },
    {
      text: lang === "ar" ? "اينفينتوري" : "Inventory",
      to: "inventory",
    },
    {
      text: lang === "ar" ? "عروض" : "Deals",
      to: "resale",
    },
    {
      text: lang === "ar" ? "بيانات المبيعات" : "Sale Data",
      to: "",
    },
    {
      text: lang === "ar" ? "تعديل المطور" : "Edit Developer",
      to: "editDeveloper",
    },
    {
      text: lang === "ar" ? "تعديل العروض" : "Edit Deals",
      to: "editDeals",
    },
    {
      text: lang === "ar" ? "تعديل الجديد" : "Edit luanches",
      to: "editluanches",
    },
    // {
    //   text: "Cityscape",
    //   to: "cityscape",
    // },
    // {
    //   text: "Edit City",
    //   to: "editcity",
    // },
  ];
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {listData.map((item, index) => (
          <Link
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
            to={`${item.to}`}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Stack
        sx={{
          flexDirection: "row",
          gap: 3,
          justifyContent: { xs: "center", sm: "end" },
        }}
      >
        {!user ? (
          <>
            <Link className="nav-link" to="/signup">
              Register
            </Link>
            <Link className="nav-link" to="/signin">
              Log in
            </Link>
          </>
        ) : (
          <>
            <Stack
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Button
                sx={{ fontWeight: "bold" }}
                onClick={() => {
                  const auth = getAuth();
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                    })
                    .catch((error) => {
                      // An error happened.
                    });
                  nav("/");
                }}
                variant="contained"
                color="error"
              >
                  {lang === "ar" ? "تسجيل الخروج" : "Log Out"}

              </Button>

              {/* {adminData.includes(user.uid) &&
                                <Link className="btn" style={{ color: 'black !important', width: '100%', textAlign: 'center',background }} to='/dashboard'>dash</Link>
                            } */}
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: "1000",
        }}
      >
        <Button variant="contained" onClick={toggleDrawer(true)}>
          +
        </Button>
      </div>
      <Drawer
        container={() => containerRef.current}
        sx={{
          [`& .MuiPaper-root`]: {
            height: "  calc(100% - 58px )",
            top: '58px',
            borderRadius: " 0 10px 10px 0",
          }
        }}
        open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
