// js/liveCounter.js
// Contador de personas en simultáneo (Realtime Database - Presence)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onDisconnect,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// 🔥 Configuración Firebase (TU PROYECTO)
const firebaseConfig = {
  apiKey: "AIzaSyAWn495-E8tvmXdffW1SF2KP9gUBOJX0mI",
  authDomain: "mundocatolico-9ece4.firebaseapp.com",
  databaseURL: "https://mundocatolico-9ece4-default-rtdb.firebaseio.com",
  projectId: "mundocatolico-9ece4",
  storageBucket: "mundocatolico-9ece4.firebasestorage.app",
  messagingSenderId: "613842157524",
  appId: "1:613842157524:web:4cf2c088a046cfeffea041"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ID único por pestaña
const tabId = crypto.randomUUID();

// Referencias
const presenceRef = ref(db, `presence/index/${tabId}`);
const counterRef  = ref(db, "presence/index");

// Marcar presencia
set(presenceRef, {
  online: true,
  at: serverTimestamp()
});

// Borrar automáticamente al cerrar pestaña / perder conexión
onDisconnect(presenceRef).remove();

// Escuchar contador en tiempo real
const counterEl = document.getElementById("liveCount");

onValue(counterRef, (snapshot) => {
  const data = snapshot.val();
  const total = data ? Object.keys(data).length : 0;
  if (counterEl) counterEl.textContent = total;
});
