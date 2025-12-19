import Cookies from "js-cookie";

export function saveAuth({ token, user, company }: { token: string; user: any; company?: any }) {
  Cookies.set("access_token", token, { expires: 1 });
  Cookies.set("user", JSON.stringify(user), { expires: 1 });

  if (company) {
    Cookies.set("company", JSON.stringify(company), { expires: 1 });
  }
}

export function clearAuth() {
  Cookies.remove("access_token");
  Cookies.remove("user");
  Cookies.remove("company");
}

export function isAuthenticated() {
  return Boolean(Cookies.get("access_token"));
}
