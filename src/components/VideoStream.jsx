import React, { useEffect, useRef, useState } from "react";

function VideoStream() {
  // Referencia al elemento <video> donde se muestra el stream de la cámara
  const videoRef = useRef(null);

  // Estado para almacenar el frame procesado recibido desde el backend
  const [frame, setFrame] = useState(null);

  // Estado para almacenar las detecciones enviadas por el backend
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    let interval; // Intervalo que controlará el envío de frames periódicamente

    // Solicitar acceso a la cámara del navegador
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Asignar el stream de la cámara al elemento <video>
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Dirección del backend (usa variable de entorno o fallback local)
        const DIR_IP = import.meta.env.VITE_API_URL || "//localhost:8000";

        // Construcción de la URL del WebSocket (protocolo ws)
        const WS_URL = `ws:${DIR_IP}`;
        const socket = new WebSocket(`${WS_URL}/api/segment-video`);

        // Crear un canvas auxiliar para capturar y comprimir frames del video
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Definir que el socket enviará datos binarios (arraybuffer)
        socket.binaryType = "arraybuffer";

        // Evento: conexión establecida con el WebSocket
        socket.onopen = () => {
          console.log("Conectado al WS");

          // Enviar un frame cada 500ms (2 fps aprox.)
          interval = setInterval(() => {
            if (videoRef.current && videoRef.current.videoWidth > 0) {
              // Reducir resolución a 320x240 para menor carga de red/procesamiento
              canvas.width = 320;
              canvas.height = 240;

              // Dibujar el frame actual de la cámara en el canvas
              ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

              // Comprimir el frame en formato JPEG con calidad del 50%
              canvas.toBlob((blob) => {
                if (blob) {
                  blob.arrayBuffer().then((buffer) => {
                    // Enviar el frame comprimido como binario por el socket
                    socket.send(buffer);
                  });
                }
              }, "image/jpeg", 0.5);
            }
          }, 500);
        };

        // Evento: mensaje recibido desde el backend
        socket.onmessage = (event) => {
          const msg = JSON.parse(event.data);

          // Actualizar el estado con el frame procesado (base64)
          setFrame(`data:image/jpeg;base64,${msg.image_base64}`);

          // Actualizar el estado con las detecciones recibidas
          setDetections(msg.detections);
        };

        // Eventos de cierre y error del WebSocket
        socket.onclose = () => console.log("WS cerrado");
        socket.onerror = (err) => console.error("WS error:", err);

        // Cleanup: detener intervalos, cerrar socket y liberar cámara al desmontar
        return () => {
          clearInterval(interval);
          socket.close();
          stream.getTracks().forEach((track) => track.stop());
        };
      })
      .catch((err) => console.error("Error acceso cámara:", err));
  }, []);

  return (
    <div>
      <h2>Predicción en Tiempo Real</h2>

      {/* El video en crudo se oculta, solo se usa como fuente para capturar frames */}
      <video ref={videoRef} style={{ display: "none" }} />

      {/* Mostrar el frame procesado recibido del backend */}
      {frame && <img src={frame} alt="stream procesado" />}

      {/* Mostrar detecciones en formato JSON si existen */}
      {detections.length > 0 && (
        <pre>{JSON.stringify(detections, null, 2)}</pre>
      )}
    </div>
  );
}

export default VideoStream;
