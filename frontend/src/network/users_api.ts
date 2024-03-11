import { User } from "../models/user";
import { fetchData } from "./notes_api";
import { isLoginuserUrl, loginUrl, logoutUrl, signUpUrl } from "./setting";

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(isLoginuserUrl, { method: "GET" });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}
export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData(signUpUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData(logoutUrl, { method: "POST" });
}
