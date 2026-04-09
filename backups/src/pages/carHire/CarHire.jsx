import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  FormHelperText,
} from "@mui/material";
import PageWrapper from "../../components/reusable/PageWrapper";
import Seo from "../../components/reusable/Seo";
import HeroSection from "../../components/reusable/HeroSection";
import CustomInput from "../../components/reusable/CustomInput";
import CustomButton from "../../components/reusable/CustomButton"; // Import CustomButton
import carHire from "../../assets/optimized/carHire.webp";
import Form from "./components/Form";
const BookingSearchForm = () => {


  return (
    <>
      <HeroSection
        title="Car Hire"
        subtitle="Find affordable car hire deals with trusted partners for a smooth and stress-free travel experience."
        image={carHire}
      />

      <Form />
    </>
  );
};

export default BookingSearchForm;
