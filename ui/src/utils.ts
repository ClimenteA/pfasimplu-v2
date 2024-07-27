import axios from "axios";

export const req = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
});
