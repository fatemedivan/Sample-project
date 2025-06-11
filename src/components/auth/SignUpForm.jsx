import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      user: {
        firstName,
        lastName,
        phoneNumber,
      },
    };

    try {
      setIsLoading(true);

      const response = await api.post("/user", data);
      console.log(response);
      

      if (response.status === 200 || response.status === 201) {
        const otpResponse = await api.post(
          `/Auth/request-otp?PhoneNumber=${phoneNumber}`
        );
        console.log('otpresponse',otpResponse);
        
        if (otpResponse.status === 200) {
          setSnackbarMessage(
            "Registration successful and verification code sent."
          );
          setSnackbarSeverity("success");
          sessionStorage.setItem('otp',otpResponse.data.reasons[0])
          setTimeout(() => {
            sessionStorage.setItem("phoneNumber", phoneNumber);
            navigate("/verify-otp");
          }, 2000);
        } else {
          setSnackbarMessage(
            "Registration succeeded but sending verification code failed."
          );
          setSnackbarSeverity("warning");
        }
      } else {
        setSnackbarMessage("Registration failed.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("An error occurred during registration.");
      setSnackbarSeverity("error");
      
    } finally {
      setSnackbarOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid",
          borderColor: "primary.main",
          padding: 4,
          borderRadius: 6,
          bgcolor: "background.paper",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            inputProps={{ maxLength: 12 }}
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            inputProps={{ maxLength: 12 }}
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            inputProps={{ maxLength: 11 }}
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "loading..." : "sign up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link href="/sign-In" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
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
