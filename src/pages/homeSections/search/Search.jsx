import { Paper, Stack, TextField, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

function Search() {
  const [serch, setSerch] = useState(null);
  const [menu, setMenu] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "admin"));
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAdminData(result);
      } catch (err) {
        console.error("خطأ أثناء تحميل بيانات admin:", err);
        setAdminError("فشل في تحميل البيانات.");
      } finally {
        setAdminLoading(false);
      }
    };

    fetchAdminData();
  }, []);
  let firebasedata = [];
  if (adminData) {
    adminData.map((item) => {
      // console.log(item)
      //projects data
      item.dev.map((proj) => {
        if (proj.proj.toUpperCase().includes(serch)) {
          firebasedata.push({
            divIcon: item.devIcon,
            devName: item.devName,
            proj,
          });
        }
      });
      //developrt data
      if (item.devName.toUpperCase().includes(serch)) {
        firebasedata.push({ Name: item.devName, Icon: item.devIcon });
      }
      //distract data
      item.dev.map((proj) => {
        if (proj.district.toUpperCase().includes(serch)) {
          if (
            !firebasedata.includes(proj.district) &&
            firebasedata.district !== ""
          ) {
            firebasedata.push(proj.district);
          }
        }
      });
    });
  }
  return (
    <Stack
      component="form"
      sx={{
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        paddingTop: "10px",
        position: "relative",
      }}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextField
        color="warning"
        className="header-search"
        sx={{ backgroundColor: "white", width: "100%", borderRadius: "10px" }}
        id="outlined-search"
        placeholder="Developers Or Area Or Compounds "
        type="search"
        onChange={(e) => {
          // console.log(e.target)
          if (e.target.value === "") {
            setSerch(null);
            setMenu(false);
          } else {
            setSerch(e.target.value.toUpperCase());
            setMenu(true);
          }
        }}
      />
      <Stack className="searchBox" sx={{ display: !menu && "none" }}>
        <Stack sx={{ width: "100%", gap: 1 }}>
          {adminData ? (
            firebasedata.length > 0 ? (
              firebasedata.map((filter, index) => {
                return (
                  <a
                    className="searchLink"
                    key={index}
                    onClick={() => setSerch(null)}
                    href={
                      filter.Name
                        ? `developers/${filter.Name}`
                        : filter.divIcon
                        ? `developers/${filter.devName}/${filter.proj.proj}`
                        : `findhome/${filter}`
                    }
                  >
                    <Paper
                      sx={{
                        padding: "10px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                      elevation={3}
                    >
                      {filter.Name ? (
                        <Stack
                          sx={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                            gap: 1,
                          }}
                        >
                          <img
                            src={filter.Icon}
                            alt=""
                            style={{
                              width: "50px",
                              filter:
                                "drop-shadow(0 0 10px rgba(0, 0, 0, .15))",
                            }}
                          />
                          <Typography sx={{ fontWeight: "bold" }}>
                            {filter.Name}
                          </Typography>
                        </Stack>
                      ) : filter.divIcon ? (
                        <Stack
                          sx={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                            gap: 1,
                          }}
                        >
                          <img
                            src={filter.divIcon}
                            alt=""
                            style={{
                              width: "50px",
                              filter:
                                "drop-shadow(0 0 10px rgba(0, 0, 0, .15))",
                            }}
                          />
                          <Stack>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {filter.proj.proj}
                            </Typography>
                            <Typography variant="caption">
                              {filter.proj.Location}
                            </Typography>
                          </Stack>
                        </Stack>
                      ) : (
                        <Stack
                          sx={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold" }}>
                            {filter}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              backgroundColor: "rgb(240, 240, 240)",
                              padding: "1px 7px",
                              borderRadius: "10px",
                              color: "rgb(33, 36, 39)",
                              fontWeight: "bold",
                            }}
                          >
                            Area
                          </Typography>
                        </Stack>
                      )}
                    </Paper>
                  </a>
                );
              })
            ) : (
              <Typography>Data Not Found !</Typography>
            )
          ) : (
            <Typography>loading</Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default memo(Search);
