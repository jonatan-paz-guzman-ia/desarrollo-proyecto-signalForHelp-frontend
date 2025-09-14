import axios from "axios";
import { io } from "socket.io-client";

const API_URL = "http://localhost:8000"; // backend FastAPI

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_URL}/api/segment-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log("Payload (res):", res);
  return res.data.image_base64; // backend debe devolver base64
}

export function connectSocket() {
  return io(API_URL, { transports: ["websocket"] });
}