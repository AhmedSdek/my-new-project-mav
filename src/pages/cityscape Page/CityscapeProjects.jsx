import { Close } from "@mui/icons-material";
import "./developers.css";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import MavLoading from "../../comp/Loading/MavLoading";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import ContactUsBtn from "../../comp/Contact Us/ContactUsBtn";
function CityscapeProjects() {
  const [hiden, setHiden] = useState("hiden");
  const [projectName, setProjectName] = useState("");
  const [devName, setDevName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = React.useState("eg");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = useState("");
  const [value, loading, error] = useCollection(collection(db, "cityscape"));
  if (value) {
    return (
      <Stack
        sx={{ minHeight: "100vh ", position: "relative", marginTop: "58px" }}
      >
        <Container>
          <Stack>
            <Stack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                padding: "10px 0",
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
                  Explore all
                  <span
                    style={{
                      color: "rgb(255 110 25)",
                      fontSize: "40px",
                      verticalAlign: "middle",
                      letterSpacing: "0px",
                    }}
                  >
                    market offers
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
                  Be The First One To Get Offers
                </h2>
              </div>
              <Stack
                sx={{
                  backgroundColor: "#edf0f0",
                  gap: 1,
                  color: "#1e4164",
                  padding: "10px",
                  borderRadius: "10px",
                  alignItems: "center",
                  margin: "10px 0",
                  width: { lg: "30%", md: "40%" },
                }}
              >
                <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Get Offer
                </Typography>
                <ContactUsBtn sectionName="Market-Offers" />
              </Stack>
            </Stack>
            <Row>
              {value.docs.map((project, index) => {
                return (
                  <Col
                    className=" col-sm-6 col-12 col-lg-4 col-md-6"
                    style={{
                      marginBottom: "15px",
                      position: "relative",
                      maxHeight: "300px",
                    }}
                    key={index}
                  >
                    <Card
                      sx={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#f6f7f7",
                        position: "relative",
                        overflow: "initial",
                        gap: 2,
                        height: "100%",
                      }}
                    >
                      {/* <Stack sx={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                <Typography sx={{ fontWeight: 'bold', color: '#515151' }}>
                                                    Cityscape
                                                </Typography>
                                            </Stack> */}
                      <Stack
                        className="colDev"
                        sx={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 2,
                          width: "100%",
                        }}
                      >
                        <Link to={`/developers/${project.data().devname}`}>
                          <img
                            className=" img shadow-filter "
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                            }}
                            src={project.data().icon}
                            alt=""
                          />
                        </Link>
                        <Stack>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {project.data().projectName}
                          </Typography>
                          <Typography variant="caption">
                            {project.data().devname}
                          </Typography>
                          <Typography variant="caption">
                            {project.data().location}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Stack
                        sx={{ gap: 2, alignItems: "center", width: "100%" }}
                      >
                        <Stack
                          divider={
                            <Divider
                              sx={{
                                borderColor: "black",
                                opacity: "1",
                                borderWidth: "1px",
                              }}
                            />
                          }
                          sx={{
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Stack
                            sx={{ padding: "5px 10px ", alignItems: "center" }}
                          >
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color: "#ff914d",
                                fontSize: "20px",
                              }}
                            >
                              {`${project.data().downPayment}%`}
                            </Typography>
                            <Typography>Downpayment</Typography>
                          </Stack>

                          <Stack
                            sx={{ padding: "5px 10px ", alignItems: "center" }}
                          >
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color: "#ff914d",
                                fontSize: "20px",
                              }}
                            >
                              {`${project.data().years} Years`}
                            </Typography>
                            <Typography>Installments</Typography>
                          </Stack>
                        </Stack>
                        {project.data().CashDiscount ? (
                          <Stack sx={{ flexDirection: "row", gap: 1 }}>
                            <Typography
                              sx={{ fontWeight: "bold", fontSize: "20px" }}
                            >
                              Cash Discount
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color: "#ff914d",
                                fontSize: "20px",
                              }}
                            >
                              {`${project.data().CashDiscount}%`}
                            </Typography>
                          </Stack>
                        ) : (
                          <Typography>{project.data().dis}</Typography>
                        )}
                      </Stack>
                      <Divider
                        sx={{
                          borderColor: "white",
                          opacity: "1",
                          borderWidth: "1px",
                          width: "100%",
                          borderStyle: "dashed",
                        }}
                      />
                      <Stack
                        sx={{ width: "100%", flexDirection: "row", gap: 1 }}
                      >
                        {/* <ContactUsIcon sectionName='Cityscape' sectionData={project.data()} /> */}
                        <Button
                          onClick={() => {
                            console.log(project.data());
                            setProjectName(project.data().projectName);
                            setDevName(project.data().devname);
                            setHiden("show");
                          }}
                          sx={{
                            width: "100%",
                            backgroundColor: "#ff914d",
                            fontWeight: "bold",
                          }}
                          variant="contained"
                        >
                          Get Offer
                        </Button>
                      </Stack>
                      {/* <Stack sx={{ position: 'absolute', top: '-20px', right: '-20px', backgroundColor: '#ff914d', borderRadius: '50%', width: '70px', height: '70px', justifyContent: 'center', alignItems: 'center', color: 'white', padding: '2px', gap: '3px', rotate: '-5deg', boxShadow: '-8px 5px 1px #0000007a' }}>
                                                <Typography variant='caption' sx={{ fontWeight: 'bold', lineHeight: '1' }}>
                                                    Cityscape
                                                </Typography>
                                                <Typography variant='caption' sx={{ fontWeight: 'bold', fontSize: '15px', lineHeight: '1' }}>
                                                    OFFER
                                                </Typography>
                                            </Stack > */}
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Divider sx={{ opacity: "1", borderWidth: "1px" }} />
          </Stack>
        </Container>

        <Stack
          sx={{
            width: "100%",
            height: "calc(100vh - 58px)",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            zIndex: "100000",
            justifyContent: "center",
            backgroundColor: "rgb(0 0 0 / 59%)",
          }}
          className={hiden}
        >
          <Card
            sx={{
              width: { sm: "80%", xs: "95%" },
              position: "relative",
              padding: "20px",
              flexDirection: "column",
              borderRadius: "10px",
              overflow: "auto",
              height: "80%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Complete the Form
            </Typography>
            <Divider
              sx={{
                borderColor: "black",
                width: "40%",
                margin: "10px auto",
                opacity: "1",
              }}
            />
            <Stack
              component="form"
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <TextField
                sx={{ margin: "10px", width: "100%" }}
                id="ProjectName"
                label=" ProjectName"
                variant="outlined"
                type="text"
                value={projectName}
                disabled
              />

              <TextField
                sx={{ margin: "10px", width: "100%" }}
                id="devname"
                label="Developer Name"
                variant="outlined"
                type="text"
                value={devName}
                disabled
              />

              <TextField
                sx={{ margin: "10px", width: "100%" }}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                label="Your Name"
                variant="outlined"
                type="text"
                value={name}
              />
              {/* <TextField
                                sx={{ margin: '10px', width: '100%' }}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                id="email" label="Your Email" variant="outlined" type="email" value={email} /> */}
              <Box sx={{ width: { xs: "100%", md: "100%" }, padding: "5px" }}>
                <PhoneInput
                  inputProps={{ required: true }}
                  country={country}
                  value={phone}
                  onChange={(value) => {
                    setPhone(value);
                  }}
                  countryCodeEditable={false}
                />
              </Box>
              <TextField
                id="message"
                label="message"
                multiline
                value={message}
                rows={4}
                sx={{ margin: "10px", width: "100%" }}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <Button
                variant="contained"
                sx={{ width: "150px" }}
                type="submit"
                disabled={name.length <= 0 || phone.length <= 2}
              >
                <a
                  style={{ width: "100%" }}
                  target="_blank"
                  href={`https://wa.me/+201008582515?text=Section%20Name%20:%20Market-Offers%0AProject%20Name%20:%20${projectName}%0ADeveloper%20Name%20:%20${devName}%0AName%20:%20${name}${
                    email && `%0AEmail%20:%20${email}`
                  }%0APhone%20Number%20:%20${phone}${
                    message && `%0AMessage%20:%20${message}`
                  }`}
                >
                  Send
                </a>
              </Button>
            </Stack>
            <IconButton
              sx={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={() => {
                setHiden("hiden");
                setName("");
                setPhone("+20");
                setMessage("");
                setEmail("");
              }}
            >
              <Close />
            </IconButton>
          </Card>
        </Stack>
      </Stack>
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

export default CityscapeProjects;
