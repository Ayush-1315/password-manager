import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./frontend/context/authContext";
import { ToasterProvider } from "./frontend/context/toasterContext";
import { PasswordProvider } from "./frontend/context/passwordContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <BrowserRouter>
      <ToasterProvider>
        <AuthProvider>
          <PasswordProvider>
            <App />
          </PasswordProvider>
        </AuthProvider>
      </ToasterProvider>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
