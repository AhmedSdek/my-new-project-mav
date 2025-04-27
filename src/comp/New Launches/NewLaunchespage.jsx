import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ContactUsBtn from "../Contact Us/ContactUsBtn";
import { Col, Row } from "react-bootstrap";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import MavLoading from "../Loading/MavLoading";

function NewLaunchespage() {
  const [value, loading, error] = useCollection(collection(db, "newlaunch"));
  if (value) {
    return (
      <Box sx={{ padding: "70px 0 0" }}>
        <Container>
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div className="header">
              <h1
                style={{
                  // letterSpacing: '0px',
                  fontFamily: "materialBold",
                  fontSize: "20px",
                  color: "rgb(30, 65, 100)",
                  textTransform: "uppercase",
                  letterSpacing: "4.14px",
                }}
              >
                Explore New
                <span
                  style={{
                    color: "rgb(255 110 25)",
                    fontSize: "40px",
                    verticalAlign: "middle",
                    letterSpacing: "0px",
                  }}
                >
                  Launches
                </span>
              </h1>
              <h2
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "2.34px",
                  color: "rgb(100, 100, 100)",
                  fontSize: "18px",
                }}
              >
                Be the first one to Reserve your Unit
              </h2>
            </div>
            <ContactUsBtn sectionName="New-Launch" />
          </Stack>
          <hr />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Launching Soon
          </Typography>
          <Row>
            {value.docs.map((itm, index) => {
              return (
                <Col
                  key={index}
                  className="col-md-6 col-12 col-lg-4"
                  style={{ marginBottom: "15px", position: "relative" }}
                >
                  <Link
                    to={`/newlaunches/${itm.data().id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ position: "relative", height: "100%" }}>
                      <Box sx={{ height: "216px" }}>
                        <img
                          style={{ height: "100%", width: "100%" }}
                          src={itm.data().img[0]}
                          alt=""
                        />
                      </Box>
                      <CardContent>
                        <Stack sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{
                              lineHeight: "1.3",
                              fontWeight: "bold",
                              color: "rgb(30, 65, 100)",
                            }}
                            variant="body1"
                          >
                            {itm.data().launchName}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: " rgb(100, 100, 100) ",
                              lineHeight: "1",
                              padding: "0 0 0 5px",
                            }}
                          >
                            {itm.data().Location}
                          </Typography>
                        </Stack>
                        {itm.data().price && (
                          <Typography sx={{ fontWeight: "bold" }}>
                            {`${itm.data().price} EGP`}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                  {/* <ContactUsIcon /> */}
                </Col>
                // <Col key={index}>
                //     <Card sx={{ height: '300px' }}>
                //         <img style={{ width: '100%' }} src={itm.data().img[0]} alt='' />
                //     </Card>
                // </Col>
              );
            })}
          </Row>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", padding: "10px 0" }}
          >
            You Need To Know
          </Typography>
          <Typography
            sx={{ color: "black", fontWeight: "bold", padding: "8px 0" }}
          >
            Real Estate Egypt Launches
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "black" }}>
            Whether searching for a new home or looking for the next lucrative
            investment opportunity, new launches in the Egyptian real estate
            market are the right choice for you. The market has been booming for
            decades with no signs of slowing down.
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "black" }}>
            This is clearly seen in the abundance of new launches all over the
            country. In fact, most real estate companies in Egypt have added new
            projects and compounds to their portfolios in the past couple of
            years.
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "black" }}>
            Purchasing a property in a newly launched project may seem like a
            risk, however, with the array of advantages they offer, it is a
            smart choice.
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "black" }}>
            Through Nawy, you can learn more about newly launched projects in
            the Egyptian real estate market and effortlessly buy your future
            home.
          </Typography>
          <Typography
            sx={{ color: "black", fontWeight: "bold", padding: "8px 0" }}
          >
            What are the Advantages of Getting a Home in a Newly Launched
            Compound?
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "black" }}>
            Benefits of buying a property in a new launch in one of the
            compounds include:
          </Typography>
          <ul style={{ color: "black" }}>
            <li>Having access to better prices and deals</li>
            <li>Picking the most suitable location</li>
            <li>Being the first to move in</li>
          </ul>
          <Typography sx={{ color: "black" }}>
            Usually, real estate companies start by collecting expressions of
            interest (EOI) on the first phase of a project before they start
            selling the properties listed.
          </Typography>
          <Typography
            sx={{ color: "black", fontWeight: "bold", padding: "8px 0" }}
          >
            What are Real Estate Expressions of Interest (EOI)?
          </Typography>
          <Typography sx={{ color: "black" }}>
            An expression of interest (EOI) is an amount of money, set by the
            real estate developer of the gated community, that shows a customer
            is interested in purchasing a property. Generally, each property
            type has its own EOI and they are collected before the construction
            commences.
          </Typography>
          <Typography sx={{ color: "black" }}>
            Here arises the question of where you should consider purchasing a
            home. In other words, which areas in Egypt are the best to live in?
          </Typography>
        </Container>
      </Box>
    );
  }
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 100px)",
        }}
      >
        <MavLoading />
      </div>
    );
  }
}

export default NewLaunchespage;
