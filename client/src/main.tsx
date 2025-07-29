import React from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles/reset.css";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/config/mui/theme";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);