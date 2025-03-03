// import { initializeApp } from "firebase/app";

// import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// import { getRemoteConfig } from "firebase/remote-config";
// import { getMessaging } from "firebase/messaging";
// import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyDVLuj5RA28gixa5KfpfPEGv1C5uqewtmM",
// //   authDomain: "chatgptpp-7d9f2.firebaseapp.com",
// //   projectId: "chatgptpp-7d9f2",
// //   storageBucket: "chatgptpp-7d9f2.appspot.com",
// //   messagingSenderId: "506381071204",
// //   appId: "1:506381071204:web:fbffe55d6ffbf76cc64071",
// //   measurementId: "G-BYE86LTFHW",
// // };

// const firebaseConfig = {
//   apiKey: "AIzaSyD7txxtpwDMMkGWyglBzr7T1IZb0_Ao3z8",
//   authDomain: "super-ai-staging.firebaseapp.com",
//   databaseURL: "https://super-ai-staging-default-rtdb.firebaseio.com",
//   projectId: "super-ai-staging",
//   storageBucket: "super-ai-staging.firebasestorage.app",
//   messagingSenderId: "683957376070",
//   appId: "1:683957376070:web:e74990a0a76a5ad4c0e647",
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// const storage = getStorage(app);

// const firestore = getFirestore(app);

// const remoteConfig = getRemoteConfig(app);

// // const messaging = getMessaging(app);

// const functions = getFunctions(app);

// const provider = new GoogleAuthProvider();

// // if (window.location.hostname === "localhost") {
// //   connectFirestoreEmulator(firestore, "localhost", 8080);
// //   connectFunctionsEmulator(functions, "localhost", 5001);
// //   connectAuthEmulator(auth, "http://localhost:9099");
// // }

// // export { app, auth, storage, firestore, remoteConfig, functions, provider };

// // src/services/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   // Add your Firebase config here
//   apiKey: "AIzaSyD7txxtpwDMMkGWyglBzr7T1IZb0_Ao3z8",
//   authDomain: "super-ai-staging.firebaseapp.com",
//   databaseURL: "https://super-ai-staging-default-rtdb.firebaseio.com",
//   projectId: "super-ai-staging",
//   storageBucket: "super-ai-staging.firebasestorage.app",
//   messagingSenderId: "683957376070",
//   appId: "1:683957376070:web:e74990a0a76a5ad4c0e647",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const functions = getFunctions(app);
// const storage = getStorage(app);
// const firestore = getFirestore(app);
// const auth = getAuth(app);

// // Use emulator in development
// if (process.env.NODE_ENV === "development") {
//   connectFunctionsEmulator(functions, "localhost", 5001);
// }

// export { app, functions, storage, firestore, auth };

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getRemoteConfig } from "firebase/remote-config";
import { getMessaging } from "firebase/messaging";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDVLuj5RA28gixa5KfpfPEGv1C5uqewtmM",
  authDomain: "chatgptpp-7d9f2.firebaseapp.com",
  projectId: "chatgptpp-7d9f2",
  storageBucket: "chatgptpp-7d9f2.appspot.com",
  messagingSenderId: "506381071204",
  appId: "1:506381071204:web:fbffe55d6ffbf76cc64071",
  measurementId: "G-BYE86LTFHW",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);

const firestore = getFirestore(app);

const remoteConfig = getRemoteConfig(app);

const messaging = getMessaging(app);

const functions = getFunctions(app);

export { app, auth, storage, firestore, remoteConfig, messaging, functions };
