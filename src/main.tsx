import "@fontsource/montserrat/index.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouteProvider from "./providers/route-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouteProvider />
  </StrictMode>,
);
