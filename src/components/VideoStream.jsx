/*import React, { useEffect, useState } from "react";
import { connectSocket } from "../services/api";

function VideoStream() {
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    const socket = connectSocket();
    socket.on("frame", (data) => {
      setFrames((prev) => [...prev.slice(-10), data]); // mantener últimos 10 frames
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h2>Streaming en Tiempo Real</h2>
      {frames.length > 0 && (
        <img src={`data:image/jpeg;base64,${frames[frames.length - 1]}`} alt="stream" />
      )}
    </div>
  );
}

export default VideoStream;*/

import React, { useEffect, useRef, useState } from "react";

function VideoStream() {
  const videoRef = useRef(null);
  const [frame, setFrame] = useState(null);

  useEffect(() => {
    let interval;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const socket = new WebSocket("ws://127.0.0.1:8000/ws/video");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        socket.onopen = () => {
          console.log("Conectado al WS");

          interval = setInterval(() => {
            if (videoRef.current) {
              canvas.width = videoRef.current.videoWidth;
              canvas.height = videoRef.current.videoHeight;
              ctx.drawImage(videoRef.current, 0, 0);
              const data = canvas.toDataURL("image/jpeg");
              socket.send(data); // enviar frame al backend
            }
          }, 200);
        };

        socket.onmessage = (event) => {
          setFrame(`data:image/jpeg;base64,${event.data}`);
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
    </div>
  );
}

export default VideoStream;