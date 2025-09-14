import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UploadImage from "./components/UploadImage";
import VideoStream from "./components/VideoStream";

function App() {
  const [view, setView] = useState("upload");

  return (
    <div>
      <Navbar setView={setView} />
      <main style={{ padding: "20px" }}>
        {view === "upload" && <UploadImage />}
        {view === "video" && <VideoStream />}
      </main>
    </div>
  );
}

export default App;