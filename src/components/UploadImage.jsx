import React, { useState } from "react";
import { uploadImage } from "../services/api";

/**
 * UploadImage component
 *
 * Permite al usuario seleccionar una imagen desde su dispositivo,
 * enviarla al backend para su procesamiento y mostrar el resultado
 * devuelto (en formato base64).
 *
 * @component
 * @example
 * // Uso dentro de la aplicación
 * <UploadImage />
 */
function UploadImage() {
  const [image, setImage] = useState(null);   // Archivo de imagen seleccionado por el usuario
  const [result, setResult] = useState(null); // Imagen procesada en base64 devuelta por el backend

  /**
   * Maneja el evento de envío del formulario.
   * Envía la imagen seleccionada al backend y actualiza el estado con el resultado.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Evento del formulario.
   * @returns {Promise<void>}
   */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const res = await uploadImage(image);
    setResult(res);
  };

  return (
    <div>
      <h2>Subir Imagen</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Enviar</button>
      </form>
      {result && (
        <div>
          <h3>Resultado</h3>
          <img src={`data:image/jpeg;base64,${result}`} alt="Resultado" />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
