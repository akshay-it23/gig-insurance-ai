function InputField({ placeholder, type = "text", size = "medium", disabled = false, value, onChange, label }) {
  const sizeStyles = {
    small: { padding: "8px 12px", fontSize: "0.8rem" },
    medium: { padding: "10px 14px", fontSize: "0.9rem" },
    large: { padding: "12px 16px", fontSize: "1rem" },
  };

  const inputStyles = {
    ...sizeStyles[size],
    borderRadius: "8px",
    border: "2px solid #4b5563",
    width: "100%",
    boxSizing: "border-box",
    marginTop: "8px",
    backgroundColor: "#2d3748",
    color: "#ffffff",
    fontWeight: "500",
    transition: "all 0.3s ease",
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "text",
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%" }}>
      {label && (
        <label style={{
          display: "block",
          marginBottom: "6px",
          marginTop: "10px",
          fontSize: "0.9rem",
          fontWeight: "700",
          color: "#ffffff",
          letterSpacing: "0.3px"
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          e.target.style.borderColor = "#3b82f6";
          e.target.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.2)";
          e.target.style.backgroundColor = "#374151";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#4b5563";
          e.target.style.boxShadow = "none";
          e.target.style.backgroundColor = "#2d3748";
        }}
        style={inputStyles}
      />
    </div>
  );
}

export default InputField;