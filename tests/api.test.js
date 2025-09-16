import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { io } from "socket.io-client";
import { uploadImage, connectSocket } from "../src/services/api";

// Mock de axios y socket.io-client para pruebas unitarias
vi.mock("axios");
vi.mock("socket.io-client");

/**
 * Suite de pruebas para los servicios API.
 */
describe("API Service", () => {
  // Limpiar mocks antes de cada test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test: uploadImage
   * Debe enviar un archivo al backend y retornar la cadena base64 simulada
   */
  it("should upload image and return base64 string", async () => {
    const mockFile = new File(["dummy"], "test.png", { type: "image/png" });
    const mockResponse = { data: { image_base64: "fake_base64_string" } };

    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await uploadImage(mockFile);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toBe("fake_base64_string");
  });

  /**
   * Test: connectSocket
   * Debe conectar con el servidor socket.io usando la URL correcta
   */
  it("should connect to socket.io server", () => {
    const mockSocket = { on: vi.fn(), emit: vi.fn() };
    io.mockReturnValue(mockSocket);

    const socket = connectSocket();

    expect(io).toHaveBeenCalledWith("http://localhost:8000", { transports: ["websocket"] });
    expect(socket).toBe(mockSocket);
  });
});
