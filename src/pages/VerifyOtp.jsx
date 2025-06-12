import React, { useState, useRef, useEffect } from "react";
import { Avatar, Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/auth/verifyOtp";


export default function OTPVerification() {
  const navigate = useNavigate();
  const [phoneNumber] = useState(() => sessionStorage.getItem("phoneNumber"));
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const inputsRef = useRef([]);

  useEffect(() => {
    const storedOtp = sessionStorage.getItem("otp");
    if (storedOtp) {
      const code = storedOtp.split(":")[1]?.trim();
      if (code && code.length === 6) {
        setOtpValues(code.split(""));
      }
    }
  }, []);

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[idx] = value.slice(-1);
      setOtpValues(newOtp);
      if (value && idx < 5) inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otpValues[idx]) {
        const newOtp = [...otpValues];
        newOtp[idx] = "";
        setOtpValues(newOtp);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await verifyOtp(phoneNumber, otpValues, navigate);
    setAlert({ open: true, message: result.message, severity: result.severity });
    setIsLoading(false);
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

        {alert.open && (
          <Alert severity={alert.severity} sx={{ width: "100%", mb: 2 }} onClose={() => setAlert({ ...alert, open: false })}>
            {alert.message}
          </Alert>
        )}

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

        <Button variant="contained" fullWidth onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>
      </Box>
    </Container>
  );
}
