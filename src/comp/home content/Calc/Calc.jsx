import { Calculate, Close, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

function Calc() {
  const [openCalc, setOpenCalc] = useState(false);
  const [total, setTotal] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [years, setYears] = useState("");
  const [maintenanceres, setMaintenanceres] = useState(0);
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState(0);
  const actions = [
    { icon: <Calculate />, name: "Calculator" },
    { icon: <Save />, name: "Save" },
  ];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Box
        sx={{
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "fixed",
          bottom: "85px",
          right: "5px",
          zIndex: "100",
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: "absolute", bottom: 16, right: 1 }}
          className="calc-icon"
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
            icon={<Calculate />}
            tooltipTitle="Calculator"
            onClick={() => setOpenCalc(true)}
          />
          {/* <SpeedDialAction
                        icon={<Save />}
                        tooltipTitle='Save'
                        onClick={handleClose}
                    /> */}
        </SpeedDial>
      </Box>
      {openCalc && (
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            height: "100%",
            width: "100%",
            backgroundColor: "#000000d1",
            zIndex: "200",
            top: "0",
          }}
        >
          <Stack
            sx={{
              width: { xs: "90%", md: "60%" },
              backgroundColor: "white",
              height: "fit-content",
              position: "relative",
              margin: "50px 0 0",
              borderRadius: "12px",
              gap: { xs: 0, sm: 0, md: 1, lg: 1 },
              padding: "40px 0 0",
            }}
          >
            <h1
              style={{
                fontWeight: "bold",
                textAlign: "center",
                // letterSpacing: '0px',
                fontFamily: "materialBold",
                fontSize: "15px",
                color: "rgb(30, 65, 100)",
                textTransform: "uppercase",
                letterSpacing: "4.14px",
                marginBottom: "0",
              }}
            >
              Budget
              <span
                style={{
                  color: "rgb(255 110 25)",
                  fontSize: "30px",
                  verticalAlign: "middle",
                  letterSpacing: "0px",
                }}
              >
                Calculator
              </span>
            </h1>

            <Card sx={{ height: "fit-content", padding: "6px 10px" }}>
              <Stack
                component="form"
                sx={{ gap: 1, alignItems: "center" }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  setAmount((total * downPayment) / 100);
                  setMonth(
                    (total - (total * downPayment) / 100) / (years * 12)
                  );
                  setMaintenanceres((total * maintenance) / 100);
                }}
              >
                <Stack
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    width: "100%",
                    gap: 1,
                  }}
                >
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    id="outlined-required"
                    label="Total Budget"
                    type="number"
                    placeholder="EGP"
                    value={total}
                    className="inbutlapel
                                        "
                    size="small"
                    onChange={(e) => setTotal(e.target.value)}
                  />
                  <TextField
                    sx={{ width: "100%" }}
                    id="maintenance"
                    label="Maintenance"
                    type="number"
                    placeholder="%"
                    value={maintenance}
                    className="inbutlapel
                                        "
                    size="small"
                    onChange={(e) => setMaintenance(e.target.value)}
                  />
                </Stack>
                <Stack
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    width: "100%",
                    gap: 1,
                  }}
                >
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    id="downPayment"
                    placeholder="%"
                    label="Down Payment"
                    type="number"
                    size="small"
                    className="inbutlapel
                                            "
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                  />
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    id="years"
                    size="small"
                    className="inbutlapel"
                    label="years Of Installments"
                    type="number"
                    placeholder="0"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                  />
                </Stack>
                <Button
                  className="calcbtn"
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "150px",
                    backgroundColor: "rgb(255 110 25)",
                    color: "rgb(30, 65, 100)",
                    fontWeight: "bold",
                  }}
                >
                  Calc
                </Button>
              </Stack>
            </Card>
            <Container>
              <Row style={{ paddingBottom: "5px" }}>
                <Col className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Down Paymant Amount
                    <Typography
                      sx={{
                        padding: "2px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#0d4d8f2e",
                        color: "rgb(255 110 25)",
                        fontWeight: "bold",
                      }}
                    >
                      {amount} EGP
                    </Typography>
                  </Typography>
                </Col>
                <Col className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Monthly Paymant
                    <Typography
                      sx={{
                        padding: "2px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#0d4d8f2e",
                        color: "rgb(255 110 25)",
                        fontWeight: "bold",
                      }}
                    >
                      {month} EGP
                    </Typography>
                  </Typography>
                </Col>
                <Col className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Quarterly payment
                    <Typography
                      sx={{
                        padding: "2px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#0d4d8f2e",
                        color: "rgb(255 110 25)",
                        fontWeight: "bold",
                      }}
                    >
                      {month * 3} EGP
                    </Typography>
                  </Typography>
                </Col>
                <Col className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Annual payment
                    <Typography
                      sx={{
                        padding: "2px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#0d4d8f2e",
                        color: "rgb(255 110 25)",
                        fontWeight: "bold",
                      }}
                    >
                      {month * 12} EGP
                    </Typography>
                  </Typography>
                </Col>
                <Col className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Maintenance
                    <Typography
                      sx={{
                        padding: "2px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#0d4d8f2e",
                        color: "rgb(255 110 25)",
                        fontWeight: "bold",
                      }}
                    >
                      {maintenanceres} EGP
                    </Typography>
                  </Typography>
                </Col>
              </Row>
            </Container>
            <IconButton
              onClick={() => {
                setOpenCalc(false);
                setTotal("");
                setDownPayment("");
                setYears("");
                setMaintenance("");
                setAmount(0);
                setMonth(0);
                setMaintenanceres(0);
              }}
              sx={{ position: "absolute", top: "1px", right: "1px" }}
            >
              <Close fontSize="large" />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default Calc;
