function Modal({ isOpen, children, onClose, title, size = "medium" }) {

  if (!isOpen) return null;

  const sizeStyles = {
    small: { minWidth: "280px", maxWidth: "350px" },
    medium: { minWidth: "350px", maxWidth: "500px" },
    large: { minWidth: "500px", maxWidth: "750px" },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#1f2937",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          ...sizeStyles[size],
          boxShadow: "0px 20px 50px rgba(0,0,0,0.6), 0px 8px 16px rgba(59, 130, 246, 0.15)",
          animation: "slideUp 0.3s ease",
          border: "1px solid #2d3748"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{
            fontSize: "1.4rem",
            fontWeight: "800",
            marginBottom: "12px",
            borderBottom: "2px solid #3b82f6",
            paddingBottom: "10px",
            color: "#ffffff",
            letterSpacing: "0.2px"
          }}>
            {title}
          </div>
        )}

        <div style={{ marginBottom: "16px" }}>
          {children}
        </div>

        <div style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
          marginTop: "16px"
        }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              fontSize: "0.9rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#2563eb";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0px 8px 16px rgba(59, 130, 246, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#3b82f6";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Close
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Modal;