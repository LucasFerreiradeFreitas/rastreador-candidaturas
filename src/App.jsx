import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { logOut } from "./services/authService";
import Button from "./components/Button";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const { user, loading } = useAuth();
  const [view, setView] = useState("login");

  if (loading) {
    return (
      <main className="auth-page">
        <p role="status">Carregando...</p>
      </main>
    );
  }

  if (user) {
    return (
      <AuthLayout title="Você está logado">
        <p>{user.email}</p>
        <Button onClick={logOut}>Sair</Button>
      </AuthLayout>
    );
  }

  if (view === "register") return <RegisterPage onNavigate={setView} />;
  if (view === "reset") return <ResetPasswordPage onNavigate={setView} />;
  return <LoginPage onNavigate={setView} />;
}

export default App;
