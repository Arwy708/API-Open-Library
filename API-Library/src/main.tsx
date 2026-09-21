import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { FournisseurFavoris } from "./contexte/ContexteFavoris";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FournisseurFavoris>
        <App />
      </FournisseurFavoris>
    </BrowserRouter>
  </React.StrictMode>
);
