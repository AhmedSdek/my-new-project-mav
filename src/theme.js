// src/theme.js
import { createTheme } from "@mui/material/styles";
import { arEG, enUS } from "@mui/x-date-pickers/locales";

export const getTheme = (lang) =>
  createTheme(
    {
      direction: lang === "ar" ? "rtl" : "ltr",
    },
    lang === "ar" ? arEG : enUS
  );
