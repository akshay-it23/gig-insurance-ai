function Button({ children, onClick, variant = "primary", size = "medium", disabled = false, rounded = false }) {
  const baseStyles = {
    padding: size === "small" ? "6px 12px" : size === "large" ? "12px 24px" : "8px 16px",
    borderRadius: rounded ? "50px" : "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "600",
    fontSize: size === "small" ? "0.875rem" : size === "large" ? "1.125rem" : "1rem",
    border: "none",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: size === "small" ? "30px" : size === "large" ? "44px" : "36px",
  };

  const variantStyles = {
    primary: {
      backgroundColor: "#2563eb",
      color: "white",
    },
    secondary: {
      backgroundColor: "#6b7280",
      color: "white",
    },
    danger: {
      backgroundColor: "#ef4444",
      color: "white",
    },
    success: {
      backgroundColor: "#22c55e",
      color: "white",
    },
  };

  const styles = { ...baseStyles, ...variantStyles[variant] };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) e.target.style.transform = "translateY(-2px)";
        if (!disabled) e.target.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "none";
      }}
      style={styles}
    >
      {children}
    </button>
  );
}

export default Button;