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
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/auth/signIn";

export default function SignInForm() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const result = await signIn({ phoneNumber });

    setAlertMessage(result.message);
    setAlertSeverity(result.severity);

    if (result.success) {
      setTimeout(() => {
        navigate("/verify-otp");
      }, 500);
    }

    setIsLoading(false);
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
          Sign in
        </Typography>

        {alertMessage && (
          <Alert severity={alertSeverity} sx={{ mt: 2, width: "100%" }}>
            {alertMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            {isLoading ? "loading..." : "sign in"}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
