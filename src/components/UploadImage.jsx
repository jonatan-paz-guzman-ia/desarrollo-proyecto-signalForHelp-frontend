import React, { useState } from "react";
import { uploadImage } from "../services/api";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

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