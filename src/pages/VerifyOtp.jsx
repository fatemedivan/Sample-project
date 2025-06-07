import React, { useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import api from "../api/api";

export default function OTPVerification() {
  const [phoneNumber, setPhoneNumber] = useState(() =>
    sessionStorage.getItem("phoneNumber")
  );
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[idx] = value.slice(-1);
      setOtpValues(newOtp);
      if (value && idx < 5) inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otpValues[idx]) {
        const newOtp = [...otpValues];
        newOtp[idx] = "";
        setOtpValues(newOtp);
      } else if (idx > 0) {
        inputsRef.current[idx - 1].focus();
      }
    }
  };

  const handleSubmit = async () => {
    const code = otpValues.join("");
    if (code.length !== 6) {
      setSnackbarMessage("Please enter the full 6-digit code.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/Auth/verify-otp", {
        phoneNumber: phoneNumber,
        otp: code,
      });

      if (response.status === 200) {
        setSnackbarMessage("Code verified successfully.");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Verification failed.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("An error occurred during verification.");
      setSnackbarSeverity("error");
      console.log("errorrr", error.message);
    } finally {
      setSnackbarOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          border: "2px solid",
          borderColor: "primary.main",
          borderRadius: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Enter Verification Code
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
          {otpValues.map((val, idx) => (
            <TextField
              key={idx}
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  padding: "10px",
                },
              }}
              value={val}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              inputRef={(el) => (inputsRef.current[idx] = el)}
              sx={{ width: 48 }}
              variant="outlined"
            />
          ))}
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
