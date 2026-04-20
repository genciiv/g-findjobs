import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./components/Navbar.css";
import "./components/Footer.css";
import "./styles/home.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/profile.css";
import "./styles/jobs.css";
import "./styles/post-job.css";
import "./styles/applications.css";
import "./styles/my-posted-jobs.css";
import "./styles/favorites.css";
import "./styles/admin.css";
import "./styles/admin-layout.css";
import "./styles/dashboard-layout.css";
import "./styles/info-pages.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);