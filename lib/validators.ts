export const validators = {
  email: (v: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Invalid email address"),

  password: (v: string) => (v.length >= 8 ? null : "Password must be at least 8 characters"),

  required: (v: string) => (v.trim() ? null : "This field is required"),
};
