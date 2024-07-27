import axios from "axios";

export const req = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});
