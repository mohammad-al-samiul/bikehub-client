import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "sonner";
import ThemeProvider from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
        <Toaster position="top-center" />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
