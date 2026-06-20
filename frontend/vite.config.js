import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";
import { getDynamicRoutes } from "./src/sitemap-generator.js";

const staticRoutes = [
  "/",
  "/shop",
  "/contact-us",
  "/about",
  "/termofservice",
  "/privacypolicy",
  "/refundpolicy",
  "/shippinpolicy",
  "/faqs",
  "/track-order",
  "/blog",
];

// https://vitejs/dev/config/
export default defineConfig(async () => {
  const dynamicRoutes = await getDynamicRoutes();

  return {
    plugins: [
      react(),
      tailwindcss(),
      sitemap({
        hostname: "https://ecommerce.digiweb.digital",
        staticRoutes,
        dynamicRoutes,
        exclude: ["/admin/*", "/user/*"],
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:5050",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rolldownOptions: {
        output: {
          strictExecutionOrder: true,
          codeSplitting: {
            groups: [
              {
                name: "react-vendor",
                test: /node_modules[\\/](react|react-dom|react-router-dom|scheduler)/,
                maxSize: 250000,
                priority: 30,
              },
              {
                name: "mui-vendor",
                test: /node_modules[\\/](@mui|@emotion)/,
                maxSize: 250000,
                priority: 25,
              },
              {
                name: "framer-motion",
                test: /node_modules[\\/]framer-motion/,
                priority: 22,
              },
              {
                name: "lucide-react",
                test: /node_modules[\\/]lucide-react/,
                priority: 21,
              },
              {
                name: "primereact",
                test: /node_modules[\\/]primereact/,
                maxSize: 250000,
                priority: 20,
              },
              {
                name: "quill",
                test: /node_modules[\\/]quill/,
                priority: 19,
              },
              {
                name: "lightgallery",
                test: /node_modules[\\/]lightgallery/,
                priority: 18,
              },
              {
                name: "swiper",
                test: /node_modules[\\/]swiper/,
                priority: 17,
              },
              {
                name: "vendor",
                test: /node_modules/,
                maxSize: 300000,
                priority: 10,
              },
            ],
          },
        },
      },
    },
  };
});
