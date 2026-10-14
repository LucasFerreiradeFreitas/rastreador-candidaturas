import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import FormMessage from "../components/FormMessage";
import Button from "../components/Button";
import { signIn, signInWithGoogle } from "../services/authService";
import { getAuthErrorMessage } from "../utils/authErrors";

function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function runAuthAction(action) {
    setError("");
    setSubmitting(true);
    try {
      await action();
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    runAuthAction(() => signIn(email, password));
  }

  return (
    <AuthLayout title="Entrar">
      <form onSubmit={handleSubmit} noValidate={false}>
        <FormField
          id="login-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          id="login-password"
          label="Senha"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormMessage>{error}</FormMessage>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <Button
        variant="secondary"
        disabled={submitting}
        onClick={() => runAuthAction(signInWithGoogle)}
      >
        Entrar com Google
      </Button>

      <p className="auth-links">
        <Button variant="link" onClick={() => onNavigate("reset")}>
          Esqueci minha senha
        </Button>
        <Button variant="link" onClick={() => onNavigate("register")}>
          Criar conta
        </Button>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
