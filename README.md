# 🎥 Frontend - SignalForHelp  

Este proyecto implementa una **aplicación en React** que captura video desde la cámara del usuario, envía frames al **backend vía WebSocket**, y muestra en tiempo real las predicciones de un modelo **YOLOv8** (palma / puño) junto con la imagen procesada.  

---

## ⚙️ Requisitos

- Node.js **16+**
- npm o yarn

---

## 📥 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/desarrollo-proyecto-signalForHelp-frontend.git
cd desarrollo-proyecto-signalForHelp-frontend
```

2. Instala dependencias:

```bash
npm install
```

o con yarn:

```bash
yarn install
```

---

## 🚀 Ejecución

Ejecuta el proyecto en modo desarrollo:

```bash
npm start
```

La aplicación estará disponible en:

```
http://localhost:3000
```

---

## 📂 Estructura principal

```
desarrollo-proyecto-signalForHelp-frontend/
├── public/ # Archivos estáticos (ej: íconos, imágenes públicas)
├── src/ # Código fuente principal
│ ├── assets/ # Recursos estáticos (ej: imágenes internas como react.svg)
│ ├── components/ # Componentes principales de la UI
│ │ ├── Navbar.jsx
│ │ ├── UploadImage.jsx
│ │ └── VideoStream.jsx
│ ├── services/ # Servicios y utilidades (ej: api.js para peticiones)
│ ├── App.jsx # Componente raíz
│ ├── App.css # Estilos globales de la app
│ ├── index.css # Estilos base
│ └── main.jsx # Punto de entrada de la aplicación
├── tests/ # Pruebas unitarias y de integración
│ └── App.test.jsx
├── .gitignore
├── Dockerfile # Configuración para ejecución en contenedor
├── eslint.config.js # Configuración de ESLint
├── index.html # HTML base
├── package.json # Dependencias y scripts
├── package-lock.json
├── vite.config.js # Configuración de Vite
└── README.md # Este archivo
```

---

## 📡 Flujo de trabajo

1. El componente **`VideoStream.jsx`**:
   - Captura video con `navigator.mediaDevices.getUserMedia`.
   - Escala los frames (ej: 320x240).
   - Comprime a JPEG.
   - Envía los bytes al **backend** vía **WebSocket** en:  
     ```
     ws://127.0.0.1:8000/api/segment-video
     ```
2. El backend procesa cada frame con YOLO y responde un JSON:

```json
{
  "image_base64": ".....",
  "detections": [
    {
      "class_id": 0,
      "class_name": "palma",
      "confidence": 0.92,
      "bbox": [34.1, 50.3, 200.4, 300.7]
    }
  ]
}
```

3. El frontend:
   - Muestra la imagen procesada (`image_base64`).
   - Lista las detecciones (`detections`).

---

## 🛠️ Notas

- Puedes ajustar **frecuencia de envío (`setInterval`)** y **resolución (`canvas.width/height`)** para optimizar rendimiento.
- Si usas **backend en otra máquina/puerto**, cambia la URL del WebSocket:
  ```js
  const socket = new WebSocket("ws://TU_IP:8000/api/segment-video");
  ```
- Para producción: construir el proyecto con
  ```bash
  npm run build
  ```