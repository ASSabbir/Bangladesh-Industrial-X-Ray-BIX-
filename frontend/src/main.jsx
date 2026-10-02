import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ContactModalProvider } from "./context/ContactModalContext.jsx";
import ContactModal from "./components/ContactModal.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContactModalProvider>
          <App />
          <ContactModal />
        </ContactModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);