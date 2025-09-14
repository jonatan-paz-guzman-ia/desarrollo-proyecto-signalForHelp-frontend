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

        const socket = new WebSocket("ws://127.0.0.1:8000/api/segment-video");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        socket.binaryType = "arraybuffer"; // importante para enviar bytes

        socket.onopen = () => {
          console.log("Conectado al WS");

          interval = setInterval(() => {
            if (videoRef.current) {
              canvas.width = videoRef.current.videoWidth;
              canvas.height = videoRef.current.videoHeight;
              ctx.drawImage(videoRef.current, 0, 0);
              canvas.toBlob((blob) => {
                if (blob) {
                  blob.arrayBuffer().then((buffer) => {
                    socket.send(buffer); // ahora enviamos bytes crudos
                  });
                }
              }, "image/jpeg");
            }
          }, 200);
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