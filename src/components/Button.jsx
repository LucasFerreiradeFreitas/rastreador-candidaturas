function Button({ variant = "primary", type = "button", ...props }) {
  return (
    <button type={type} className={`button button--${variant}`} {...props} />
  );
}

export default Button;
