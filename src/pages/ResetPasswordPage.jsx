import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import FormMessage from "../components/FormMessage";
import Button from "../components/Button";
import { resetPassword } from "../services/authService";
import { getAuthErrorMessage } from "../utils/authErrors";

function ResetPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await resetPassword(email);
      setSuccess(
        "Se esse e-mail estiver cadastrado, enviaremos um link para redefinir a senha. Confira também a caixa de spam.",
      );
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Recuperar senha">
      <form onSubmit={handleSubmit}>
        <FormField
          id="reset-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormMessage>{error}</FormMessage>
        <FormMessage type="success">{success}</FormMessage>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar link"}
        </Button>
      </form>

      <p className="auth-links">
        <Button variant="link" onClick={() => onNavigate("login")}>
          Voltar para o login
        </Button>
      </p>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
