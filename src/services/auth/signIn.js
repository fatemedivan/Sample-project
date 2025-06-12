import api from "../../api/api";

export const signIn = async ({ phoneNumber }) => {
  try {
    const response = await api.post(`/Auth/request-otp?PhoneNumber=${phoneNumber}`);

    if (response.status === 200 || response.status === 201) {
      const otp = response.data.reasons[0];
      sessionStorage.setItem("otp", otp);
      sessionStorage.setItem("phoneNumber", phoneNumber);
      return {
        success: true,
        message: "Verification code sent successfully.",
        severity: "success",
      };
    } else {
      return {
        success: false,
        message: "Failed to send verification code.",
        severity: "error",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred.",
      severity: "error",
    };
  }
};
