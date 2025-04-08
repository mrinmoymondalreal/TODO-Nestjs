import axios from "axios";

export function getAuthInstance() {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getBasicInstance() {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
