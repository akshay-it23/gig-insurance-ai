function Card({ children, variant = "default", width = "320px" }) {
  const variantStyles = {
    default: {
      background: "#1f2937",
      border: "1px solid #374151",
      color: "white",
    },
    elevated: {
      background: "#1f2937",
      border: "1px solid #2d3748",
      color: "white",
      boxShadow: "0px 20px 50px rgba(0,0,0,0.6), 0px 8px 16px rgba(59, 130, 246, 0.15)",
    },
    outlined: {
      background: "transparent",
      border: "2px solid #3b82f6",
      color: "white",
    },
  };

  const styles = {
    ...variantStyles[variant],
    padding: "24px",
    borderRadius: "12px",
    width: width,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <div
      style={styles}
      onMouseEnter={(e) => {
        if (variant === "default") {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0px 25px 50px rgba(0,0,0,0.5), 0px 8px 16px rgba(59, 130, 246, 0.2)";
          e.currentTarget.style.borderColor = "#4b5563";
        } else if (variant === "elevated") {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0px 30px 60px rgba(0,0,0,0.7), 0px 10px 20px rgba(59, 130, 246, 0.25)";
        } else if (variant === "outlined") {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0px 15px 40px rgba(59, 130, 246, 0.3)";
          e.currentTarget.style.borderColor = "#60a5fa";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow || "none";
        e.currentTarget.style.borderColor = variant === "outlined" ? "#3b82f6" : (variant === "elevated" ? "#2d3748" : "#374151");
      }}
    >
      {children}
    </div>
  );
}

export default Card;