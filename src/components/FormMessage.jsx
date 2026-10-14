function FormMessage({ type = "error", children }) {
  if (!children) return null;
  return (
    <p
      className={`form-message form-message--${type}`}
      role={type === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}

export default FormMessage;
