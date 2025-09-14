import React from "react";

function Navbar({ setView }) {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px", background: "#222", color: "#fff" }}>
      <button onClick={() => setView("upload")}>Subir Imagen</button>
      <button onClick={() => setView("video")}>Video en Tiempo Real</button>
    </nav>
  );
}

export default Navbar;