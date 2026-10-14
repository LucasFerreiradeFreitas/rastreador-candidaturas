import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import FormMessage from "../components/FormMessage";
import Button from "../components/Button";
import { signUp, signInWithGoogle } from "../services/authService";
import { getAuthErrorMessage } from "../utils/authErrors";

function RegisterPage({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
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
    if (password !== confirmPassword) {
      setConfirmError("As senhas não coincidem.");
      return;
    }
    setConfirmError("");
    runAuthAction(() => signUp(email, password));
  }

  return (
    <AuthLayout title="Criar conta">
      <form onSubmit={handleSubmit}>
        <FormField
          id="register-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          id="register-password"
          label="Senha (mínimo 6 caracteres)"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormField
          id="register-confirm"
          label="Confirmar senha"
          type="password"
          autoComplete="new-password"
          required
          error={confirmError}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormMessage>{error}</FormMessage>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>

      <Button
        variant="secondary"
        disabled={submitting}
        onClick={() => runAuthAction(signInWithGoogle)}
      >
        Continuar com Google
      </Button>

      <p className="auth-links">
        <Button variant="link" onClick={() => onNavigate("login")}>
          Já tenho conta
        </Button>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
