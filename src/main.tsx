import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TopArtistsPage from "@/pages/TopArtistsPage";
import TopTracksPage from "@/pages/TopTracksPage";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopTracksPage />,
  },
  {
    path: "/artists",
    element: <TopArtistsPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Toaster />
    <RouterProvider router={router} />
  </ThemeProvider>
);
