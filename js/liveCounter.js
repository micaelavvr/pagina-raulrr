// js/liveCounter.js (Realtime Database Presence)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onDisconnect,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const el = document.getElementById("liveCount");
const paint = (v) => { if (el) el.textContent = String(v); };

const firebaseConfig = {
  apiKey: "AIzaSyAWn495-E8tvmXdffW1SF2KP9gUBOJX0mI",
  authDomain: "mundocatolico-9ece4.firebaseapp.com",
  databaseURL: "https://mundocatolico-9ece4-default-rtdb.firebaseio.com",
  projectId: "mundocatolico-9ece4",
  storageBucket: "mundocatolico-9ece4.firebasestorage.app",
  messagingSenderId: "613842157524",
  appId: "1:613842157524:web:4cf2c088a046cfeffea041"
};

try {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // ID único por pestaña (fallback por si randomUUID no existe)
  const tabId = (crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`);

  const presenceRef = ref(db, `presence/index/${tabId}`);
  const listRef = ref(db, "presence/index");

  // Escribir presencia
  await set(presenceRef, { online: true, at: serverTimestamp() });

  // Quitar al desconectar
  onDisconnect(presenceRef).remove();

  // Contar presentes
  onValue(listRef, (snap) => {
    const data = snap.val();
    const count = data ? Object.keys(data).length : 0;
    paint(count);
  }, (err) => {
    console.error("Firebase onValue error:", err);
    paint("ERR");
  });

} catch (err) {
  console.error("Firebase init/write error:", err);
  paint("ERR");
}
