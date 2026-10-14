const messages = {
  "auth/invalid-email": "Informe um e-mail válido.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/user-not-found": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/email-already-in-use": "Este e-mail já está cadastrado. Tente entrar.",
  "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
  "auth/too-many-requests":
    "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
  "auth/network-request-failed":
    "Falha de conexão. Verifique sua internet e tente de novo.",
  "auth/popup-closed-by-user": "O login com Google foi cancelado.",
  "auth/cancelled-popup-request": "O login com Google foi cancelado.",
  "auth/popup-blocked":
    "O navegador bloqueou a janela do Google. Libere pop-ups e tente de novo.",
};

export function getAuthErrorMessage(error) {
  return messages[error?.code] ?? "Algo deu errado. Tente novamente.";
}
