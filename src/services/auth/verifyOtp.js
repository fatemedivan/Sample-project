import api from "../../api/api";

export async function verifyOtp(
  phoneNumber,
  otpValues,
  navigate,
  updateAuthData
) {
  const code = otpValues.join("");
  if (code.length !== 6) {
    return {
      success: false,
      message: "Please enter the full 6-digit code.",
      severity: "warning",
    };
  }

  try {
    const response = await api.post("/Auth/verify-otp", {
      phoneNumber,
      otp: code,
    });

    if (response.status === 200) {
      const userData = response.data.value.loggedInUser;
      const jwtToken = response.data.value.jwtToken;
      const role = response.data.value.roles[0];

      updateAuthData(jwtToken, userData, role);

      setTimeout(() => {
        navigate("/");
      }, 500);

      return {
        success: true,
        message: "Verification successful.",
        severity: "success",
      };
    } else {
      const errorMessage = response.data?.message || "Verification failed.";
      return {
        success: false,
        message: errorMessage,
        severity: "error",
      };
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred during verification.";
    return {
      success: false,
      message: errorMessage,
      severity: "error",
    };
  }
}
