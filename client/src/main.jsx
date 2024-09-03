// src/main.jsx

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; // Corrected import path for Apollo Client
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
