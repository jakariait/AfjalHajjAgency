// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
//
// import "react-loading-skeleton/dist/skeleton.css";
// import App from "./App.jsx";
// import TagManager from "react-gtm-module";
//
// const API_BASE = import.meta.env.VITE_API_URL;
//
// const initializeApp = async () => {
//   try {
//     const res = await fetch(`${API_BASE}/getGTM`);
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//
//     const data = await res.json();
//
//     if (data?.isActive && data?.googleTagManagerId) {
//       TagManager.initialize({ gtmId: data.googleTagManagerId });
//     }
//   } catch {
//     // fail silently in production
//   } finally {
//     createRoot(document.getElementById("root")).render(
//       <StrictMode>
//         <App />
//       </StrictMode>,
//     );
//   }
// };
//
// initializeApp();


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "react-loading-skeleton/dist/skeleton.css";
import App from "./App.jsx";

const API_BASE = import.meta.env.VITE_API_URL;

const installGTM = (gtmId) => {
  if (!gtmId || document.getElementById("gtm-script")) return;

  // dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  // Official GTM script
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;

  const firstScript = document.getElementsByTagName("script")[0];

  if (firstScript) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }

  // Official noscript fallback
  const noscript = document.createElement("noscript");
  noscript.id = "gtm-noscript";
  noscript.innerHTML = `
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
      height="0"
      width="0"
      style="display:none;visibility:hidden"
    ></iframe>
  `;

  document.body.prepend(noscript);
};

const initializeApp = async () => {
  try {
    const res = await fetch(`${API_BASE}/getGTM`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (data?.isActive && data?.googleTagManagerId) {
      installGTM(data.googleTagManagerId);
    }
  } catch (error) {
    console.error("GTM initialization failed:", error);
  } finally {
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};

initializeApp();