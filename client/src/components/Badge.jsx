function Badge({ text, variant = "success", size = "medium" }) {
  const variantStyles = {
    success: {
      backgroundColor: "#22c55e",
      color: "white",
    },
    warning: {
      backgroundColor: "#f59e0b",
      color: "white",
    },
    danger: {
      backgroundColor: "#ef4444",
      color: "white",
    },
    info: {
      backgroundColor: "#3b82f6",
      color: "white",
    },
    neutral: {
      backgroundColor: "#6b7280",
      color: "white",
    },
  };

  const sizeStyles = {
    small: { padding: "4px 10px", fontSize: "11px" },
    medium: { padding: "6px 14px", fontSize: "13px" },
    large: { padding: "8px 16px", fontSize: "15px" },
  };

  const styles = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    borderRadius: "16px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    letterSpacing: "0.2px",
    transition: "all 0.2s ease",
    minHeight: size === "small" ? "24px" : size === "medium" ? "28px" : "32px",
  };

  return (
    <span
      style={styles}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.08)";
        e.currentTarget.style.boxShadow = "0px 6px 16px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {text}
    </span>
  );
}

export default Badge;