import React, { useEffect, useRef, useState } from "react";

function VideoStream() {
  const videoRef = useRef(null);
  const [frame, setFrame] = useState(null);
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    let interval;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Usa variable de entorno o fallback

        const DIR_IP = import.meta.env.VITE_API_URL || "//localhost:8000";
        const WS_URL = `ws:${DIR_IP}`;
        const socket = new WebSocket(`${WS_URL}/api/segment-video`);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        socket.binaryType = "arraybuffer"; // enviar bytes puros

        socket.onopen = () => {
          console.log("Conectado al WS");

          interval = setInterval(() => {
            if (videoRef.current && videoRef.current.videoWidth > 0) {
              // Ajuste 1: reducir resolución (menos píxeles = más rápido)
              canvas.width = 320;
              canvas.height = 240;

              ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

              // Ajuste 3: compresión JPEG al 50%
              canvas.toBlob((blob) => {
                if (blob) {
                  blob.arrayBuffer().then((buffer) => {
                    socket.send(buffer);
                  });
                }
              }, "image/jpeg", 0.5);
            }
          }, 500); // Ajuste 2: enviar cada 500 ms (~2 fps)
        };

        socket.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          setFrame(`data:image/jpeg;base64,${msg.image_base64}`);
          setDetections(msg.detections);
        };

        socket.onclose = () => console.log("WS cerrado");
        socket.onerror = (err) => console.error("WS error:", err);

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
      <video ref={videoRef} style={{ display: "none" }} />
      {frame && <img src={frame} alt="stream procesado" />}
      {detections.length > 0 && (
        <pre>{JSON.stringify(detections, null, 2)}</pre>
      )}
    </div>
  );
}

export default VideoStream;