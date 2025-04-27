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

export default function NavBtn() {
  const [open, setOpen] = React.useState(false);
  const [user] = useAuthState(auth);
  const nav = useNavigate();
  const adminData = [
    "arB4bTAtCiaMCBprrnOTRz6YbmT2",
    "YZia9oRhhzdNFG1JOXteZOpcdw83",
  ];
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const listData = [
    {
      text: "Sale Data",
      to: "",
    },
    {
      text: "Resell Form",
      to: "resale",
    },
    {
      text: "Database",
      to: "database",
    },
    {
      text: "New Launches",
      to: "newlaunchesform",
    },
    {
      text: "Inventory",
      to: "inventory",
    },
    {
      text: "EditDeveloper",
      to: "editDeveloper",
    },
    {
      text: "EditDeals",
      to: "editDeals",
    },
    {
      text: "Editluanches",
      to: "editluanches",
    },
    {
      text: "Cityscape",
      to: "cityscape",
    },
    {
      text: "EditCity",
      to: "editcity",
    },
  ];
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
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
                Log Out
              </Button>

              {/* {adminData.includes(user.uid) &&
                                <Link className="btn" style={{ color: 'black !important', width: '100%', textAlign: 'center',background }} to='/dashboard'>dash</Link>
                            } */}
            </Stack>
          </>
        )}
      </Stack>
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
    </Box>
  );

  return (
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
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
