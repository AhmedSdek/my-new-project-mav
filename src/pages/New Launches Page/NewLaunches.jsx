import { Box, Button, Stack, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useTranslation } from "react-i18next";
import ReadOnlyDateRange from "./Calenda";
import { useGlobal } from "../../context/GlobalContext";

function NewLaunches() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { country } = useGlobal();

  const [developers, setDevelopers] = useState([]);
  console.log(developers);
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "northcoast"));
        const filteredDevs = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (dev) =>
              dev?.developer?.country?.en?.toLowerCase() === country.en ||
              dev?.developer?.country?.ar === country.ar
          );
        setDevelopers(filteredDevs);
      } catch (err) {
        console.error("خطأ أثناء جلب المطورين:", err);
      }
    };

    fetchDevelopers();
  }, [country]);

  return (
    <>
      <Stack
        sx={{
          minHeight: "calc(100vh - 100px)",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "60px",
        }}
      >
        <Box sx={{ height: "100%" }}>
          {developers.length > 0 ? (
            developers.map((item, index) => {
              return (
                <Stack key={index}>
                  <img src={item.img} alt="" />
                  <Typography>{item.compoundName[lang]}</Typography>
                  <Typography>{item.developer.country[lang]}</Typography>
                  <Typography>{item.developer.devName[lang]}</Typography>
                  <ReadOnlyDateRange from={item.startDate} to={item.endDate} />
                  {item.googleMap && (
                    <div style={{ width: "100%", height: "400px" }}>
                      <iframe
                        title="Location Map"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${item.googleMap}&z=15&output=embed`}
                      ></iframe>
                    </div>
                  )}
                </Stack>
              );
            })
          ) : (
            <Typography>
              {lang === "en"
                ? `No Projects in ${country.en}`
                : `لا يوجد مشاريع في ${country.ar}`}
            </Typography>
          )}
        </Box>
      </Stack>
    </>
  );
}

export default NewLaunches;
