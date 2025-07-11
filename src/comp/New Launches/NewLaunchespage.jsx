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

  return (
    <>
      <h2>hel</h2>
    </>
  )
}

export default NewLaunchespage;
