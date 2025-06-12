import api from "../../api/api";

export async function verifyOtp(phoneNumber, otpValues, navigate) {
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

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("role", role);

      setTimeout(() => {
        navigate("/");
      }, 2000);

      return {
        success: true,
        message: "Verification successful.",
        severity: "success",
      };
    } else {
      return {
        success: false,
        message: "Verification failed.",
        severity: "error",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during verification.",
      severity: "error",
    };
  }
}
