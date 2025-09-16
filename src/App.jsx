import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UploadImage from "./components/UploadImage";
import VideoStream from "./components/VideoStream";

/**
 * Componente principal de la aplicación.
 * 
 * Maneja la navegación entre las vistas:
 * - Subir una imagen para segmentación.
 * - Procesar video en tiempo real.
 *
 * @component
 * @returns {JSX.Element} - Render de la aplicación completa.
 */
function App() {
  // Estado que define la vista actual ("upload" | "video")
  const [view, setView] = useState("upload");

  return (
    <div>
      {/* Barra de navegación que permite cambiar de vista */}
      <Navbar setView={setView} />

      {/* Contenedor principal con la vista seleccionada */}
      <main style={{ padding: "20px" }}>
        {view === "upload" && <UploadImage />}
        {view === "video" && <VideoStream />}
      </main>
    </div>
  );
}

export default App;
