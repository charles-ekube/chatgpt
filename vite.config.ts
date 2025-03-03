// /// <reference types="vitest" />

// import legacy from '@vitejs/plugin-legacy'
// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     legacy()
//   ],
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: './src/setupTests.ts',
//   }
// })

// / <reference types="vitest" />

// import legacy from "@vitejs/plugin-legacy";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), legacy()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes("node_modules")) {
//             if (id.includes("react")) return "vendor-react"; // Separate chunk for React
//             if (id.includes("lodash")) return "vendor-lodash"; // Separate chunk for Lodash
//             return "vendor"; // General vendor chunk for other dependencies
//           }
//         },
//       },
//     },
//   },
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "./src/setupTests.ts",
//   },
// });

// /// <reference types="vitest" />

// import legacy from "@vitejs/plugin-legacy";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vitest/config"; // ✅ Use this for Vitest support
// import { UserConfig } from "vite";

// // https://vitejs.dev/config/
// const config: UserConfig = {
//   plugins: [react(), legacy()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes("node_modules")) {
//             if (id.includes("react")) return "vendor-react"; // Separate chunk for React
//             if (id.includes("lodash")) return "vendor-lodash"; // Separate chunk for Lodash
//             return "vendor"; // General vendor chunk for other dependencies
//           }
//         },
//       },
//     },
//   },
//   test: {
//     // ✅ Now properly recognized by Vitest
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "./src/setupTests.ts",
//   },
// };

// export default defineConfig(config);

import legacy from "@vitejs/plugin-legacy";
// import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
// Import any other plugins you're using

export default defineConfig({
  plugins: [
    react(),
    legacy(),
    // other plugins
  ],
  build: {
    chunkSizeWarningLimit: 500, // Optionally increase the warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Group Ionic-related packages
          "ionic-core": ["@ionic/react", "@ionic/react-router"],
          // Group React and related packages
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Group workspace features by type
          "image-features": ["./src/pages/workspace/text-to-image/TextToImage", "./src/pages/workspace/text-to-image/ImageStyle", "./src/pages/workspace/text-to-image/ImageEditor", "./src/pages/workspace/text-to-image/ImagePreview"],
          "video-features": ["./src/pages/workspace/video/TextToVideo", "./src/pages/workspace/video/VideoStyle", "./src/pages/workspace/video/VideoPreview", "./src/pages/workspace/video/ImageToVideo"],
          "audio-features": ["./src/pages/workspace/speech/TextToSpeech", "./src/pages/workspace/sound/SoundGeneration"],
          "3d-features": ["./src/pages/workspace/3d/3DGeneration", "./src/pages/workspace/3d/3DPreview"],
          // Auth pages
          auth: ["./src/pages/auth/Login", "./src/pages/auth/Register", "./src/pages/auth/PasswordRecovery", "./src/pages/auth/OtpVerification", "./src/pages/auth/SetupName", "./src/pages/auth/SetupPassword"],
          // Profile pages
          profile: ["./src/pages/profile/Settings", "./src/pages/profile/ManageAccount", "./src/pages/profile/Referrals", "./src/pages/profile/Credits"],
        },
      },
    },
  },
  test: {
    // ✅ Now properly recognized by Vitest
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
