import React from "react";

const Sidebar = () => (
  <aside
    className="sidebar-custom"
    style={{
      width: 180,
      background: "#fff",
      borderRadius: 20,
      margin: 20,
      padding: "24px 0 16px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      minWidth: 60,
      justifyContent: "space-between",
      transition: "width 0.2s"
    }}
  >
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
          justifyContent: "center",
        }}
      >
        <img
          src="src/assets/images/Logo.png"
          alt="Logo"
          width={28}
          style={{ borderRadius: 8 }}
        />
        <span
          style={{
            color: "#2563eb",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 1,
          }}
        >
          EduSolo
        </span>
      </div>
      <nav
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
        }}
      >
        <button
          style={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "10px 10px",
            fontWeight: 700,
            fontSize: 15,
            gap: 8,
            marginBottom: 8,
            boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
            justifyContent: "center",
          }}
        >
          <img
            src="src/assets/images/user1.png"
            alt="Pengguna"
            style={{ width: 24, height: 24, marginRight: 6 }}
          />
          Pengguna
        </button>
      </nav>
    </div>
    {/* Admin Info */}
    <div
      style={{
        width: "90%",
        display: "flex",
        alignItems: "center",
        background: "#f1f5f9",
        borderRadius: 12,
        padding: "8px 8px",
        marginTop: 18,
      }}
    >
      <img
        src="src/assets/images/Admin.png"
        alt="Admin"
        width={28}
        style={{ borderRadius: "50%", marginRight: 8 }}
      />
      <div>
        <div style={{ fontWeight: 700, fontSize: 12 }}>EduSolo</div>
        <div style={{ color: "#2563eb", fontSize: 11, fontWeight: 600 }}>
          Admin
        </div>
      </div>
      <span
        style={{
          marginLeft: "auto",
          color: "#94a3b8",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        ⎋
      </span>
    </div>
  </aside>
);

export default Sidebar;