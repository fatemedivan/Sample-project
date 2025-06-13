import api from "../../api/api";

export const signUp = async ({ firstName, lastName, phoneNumber, navigate }) => {
  try {
    const userData = { firstName, lastName, phoneNumber };
    const registerResponse = await api.post("/user", { user: userData });

    if ([200, 201].includes(registerResponse.status)) {
      const otpResponse = await api.post(`/Auth/request-otp?PhoneNumber=${phoneNumber}`);

      if (otpResponse.status === 200) {
        sessionStorage.setItem("otp", otpResponse.data.reasons[0]);
        sessionStorage.setItem("phoneNumber", phoneNumber);

        setTimeout(() => {
          navigate("/verify-otp");
        }, 500);

        return {
          success: true,
          message: "Registration successful and verification code sent.",
          severity: "success",
        };
      } else {
        return {
          success: false,
          message: "Registration succeeded but OTP sending failed.",
          severity: "warning",
        };
      }
    } else {
      return {
        success: false,
        message: "Registration failed.",
        severity: "error",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during registration.",
      severity: "error",
    };
  }
};
