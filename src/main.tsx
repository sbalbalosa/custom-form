import React from "react";
import ReactDOM from "react-dom/client";
import "@picocss/pico/css/pico.min.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <main
      className="container"
      style={{
        marginTop: "5vh",
      }}
    >
      <App />
    </main>
  </React.StrictMode>
);
