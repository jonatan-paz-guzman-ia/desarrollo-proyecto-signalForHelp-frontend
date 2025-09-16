import React from "react";

/**
 * Navbar component
 *
 * Renderiza la barra de navegación principal de la aplicación,
 * permitiendo alternar entre las vistas de "Subir Imagen"
 * y "Video en Tiempo Real".
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.setView - Función para cambiar la vista actual.
 *
 * @example
 * // Ejemplo de uso
 * <Navbar setView={setView} />
 */
function Navbar({ setView }) {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px", background: "#222", color: "#fff" }}>
      <button onClick={() => setView("upload")}>Subir Imagen</button>
      <button onClick={() => setView("video")}>Video en Tiempo Real</button>
    </nav>
  );
}

export default Navbar;
