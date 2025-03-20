import React from "react";
import ReactDOM from "react-dom/client";
import AppProvider from "./ContextProvider.jsx";  
import Dashtw from "./Dashtw";
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <Dashtw />
  </AppProvider>
);
