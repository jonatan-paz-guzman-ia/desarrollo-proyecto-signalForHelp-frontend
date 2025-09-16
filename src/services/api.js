import axios from "axios";
import { io } from "socket.io-client";

// Dirección del backend: usa variable de entorno o fallback a localhost:8000
const DIR_IP = import.meta.env.VITE_API_URL || "//localhost:8000";
// Construcción de la URL base del API
const API_URL = `http:${DIR_IP}`;

/**
 * Sube una imagen al backend para su segmentación.
 * 
 * @param {File} file - Archivo de imagen seleccionado por el usuario.
 * @returns {Promise<string>} - Imagen procesada en formato Base64 (devuelta por el backend).
 */
export async function uploadImage(file) {
  // Crear objeto FormData para enviar el archivo como multipart/form-data
  const formData = new FormData();
  formData.append("file", file);

  // Petición POST al endpoint /api/segment-image
  const res = await axios.post(`${API_URL}/api/segment-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  console.log("Payload (res):", res);

  // El backend debe devolver la imagen procesada en base64
  return res.data.image_base64;
}

/**
 * Establece una conexión WebSocket con el backend usando socket.io.
 *
 * @returns {Socket} - Instancia del socket conectada al backend.
 */
export function connectSocket() {
  return io(API_URL, { transports: ["websocket"] });
}
