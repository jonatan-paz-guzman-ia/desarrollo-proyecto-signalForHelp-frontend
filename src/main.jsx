import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/**
 * Punto de entrada principal de la aplicación React.
 * 
 * - Renderiza el componente raíz `<App />`.
 * - Usa `React.StrictMode` para activar comprobaciones adicionales
 *   durante el desarrollo (detecta efectos secundarios, 
 *   prácticas inseguras, etc.).
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
