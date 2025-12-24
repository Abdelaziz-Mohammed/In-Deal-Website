export const passwordResetStore = {
  setEmail(email: string) {
    sessionStorage.setItem("reset_email", email);
  },
  getEmail() {
    return sessionStorage.getItem("reset_email");
  },
  setOtp(otp: string) {
    sessionStorage.setItem("reset_otp", otp);
  },
  getOtp() {
    return sessionStorage.getItem("reset_otp");
  },
  clear() {
    sessionStorage.removeItem("reset_email");
    sessionStorage.removeItem("reset_otp");
  },
};
