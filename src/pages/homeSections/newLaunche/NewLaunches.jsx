import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";
import ReactLoading from "react-loading";

// import required modules
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import MavLoading from "../../../comp/Loading/MavLoading";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useGlobal } from "../../../context/GlobalContext";
function NewLaunches() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [newlaunch, setNewlaunch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { country } = useGlobal();
  useEffect(() => {
    const fetchNewlaunch = async () => {
      try {
        const q = query(
          collection(db, "newlaunch"),
          where("country.en", "==", country.en)
        );
        const snapshot = await getDocs(q);
        const newlaunchData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNewlaunch(newlaunchData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNewlaunch();
  }, [country]);
  return (
    <section style={{ margin: "25px 0" }}>
      <Container>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {lang === "ar" ? "ينطلق الآن" : "Launches Now"}
          </Typography>
          <Link to="/newlaunches">
            <Typography sx={{ fontWeight: "bold" }}>
              {lang === "ar" ? "استكشف الكل" : "Explore All"}
            </Typography>
          </Link>
        </Stack>
        {loading ? (
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <ReactLoading
              color="black"
              type={"spin"}
              height={"50px"}
              width={"50px"}
            />
          </Stack>
        ) : newlaunch && newlaunch.length > 0 ? (
          <Stack>
            <Swiper
              spaceBetween={10}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              freeMode={true}
              loop={true}
              modules={[FreeMode, Pagination, Autoplay]}
              className="myLaunchSwiper"
            >
              {newlaunch.map((item) => {
                return (
                  <div key={item}>
                    {newlaunch.img.map((img) => {
                      return (
                        <SwiperSlide key={img} style={{ height: "100%" }}>
                          <Link
                            aria-label={newlaunch.launchName}
                            style={{ width: "393px", height: "225px" }}
                            to={`/newlaunches/${newlaunch.id}`}
                          >
                            <picture>
                              <img
                                style={{ borderRadius: "8px" }}
                                src={img}
                                sizes="(min-width: 600px) 50vw, 100vw"
                                alt="Flowers"
                              />
                            </picture>
                          </Link>
                        </SwiperSlide>
                      );
                    })}
                  </div>
                );
              })}
            </Swiper>
          </Stack>
        ) : (
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              minHeight: "150px",
            }}
          >
            <Typography>No Data in {country[lang]}</Typography>
          </Stack>
        )}
      </Container>
    </section>
  );
}

export default NewLaunches;
