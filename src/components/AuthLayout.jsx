function AuthLayout({ title, children }) {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>{title}</h1>
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
