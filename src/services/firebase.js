import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const variaveisFaltando = Object.entries(firebaseConfig)
  .filter(([, valor]) => !valor)
  .map(([chave]) => chave);

if (variaveisFaltando.length > 0) {
  throw new Error(
    `Configuração do Firebase incompleta. Faltando: ${variaveisFaltando.join(
      ", ",
    )}. Confira seu arquivo .env (use o .env.example como modelo).`,
  );
}

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
