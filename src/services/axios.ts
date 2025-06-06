import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/search",
  headers: {
    "Content-Type": "application/json",
  },
});

export const aiServerApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
