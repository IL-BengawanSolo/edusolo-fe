import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Untuk hamburger menu

  // Simulasi proses login/daftar user baru
  const handleUserLoginOrRegister = (userData) => {
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        email: userData.email,
        lastLogin: new Date().toLocaleString(),
        birthDate: userData.birthDate || "-",
        status: "Active",
      },
    ]);
  };

  // Contoh form register/login user baru
  const [form, setForm] = useState({ email: "", birthDate: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email) return;
    handleUserLoginOrRegister(form);
    setForm({ email: "", birthDate: "" });
  };

  // Filter dan Pagination
  const filteredUsers = users.filter(
    (user) =>
      (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
      (user.lastLogin && user.lastLogin.toLowerCase().includes(search.toLowerCase())) ||
      (user.birthDate && user.birthDate.toLowerCase().includes(search.toLowerCase())) ||
      (user.status && user.status.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E9EBEF",
        display: "flex",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Hamburger Button */}
      <button
        className="hamburger-btn"
        onClick={() => setSidebarOpen((open) => !open)}
        style={{
          position: "fixed",
          top: 18,
          left: 18,
          zIndex: 1001,
          background: "#2563eb",
          border: "none",
          borderRadius: 8,
          width: 44,
          height: 44,
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        aria-label="Toggle Sidebar"
      >
        <span
          style={{
            display: "block",
            width: 24,
            height: 3,
            background: "#fff",
            borderRadius: 2,
            margin: "0 0 5px 0",
            transition: "0.2s",
          }}
        ></span>
        <span
          style={{
            display: "block",
            width: 24,
            height: 3,
            background: "#fff",
            borderRadius: 2,
            margin: "0 0 5px 0",
            transition: "0.2s",
          }}
        ></span>
        <span
          style={{
            display: "block",
            width: 24,
            height: 3,
            background: "#fff",
            borderRadius: 2,
            transition: "0.2s",
          }}
        ></span>
      </button>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
            zIndex: 1000,
            display: "block",
          }}
        />
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "32px 24px 0 24px",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          marginLeft: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            flexWrap: "wrap", 
            gap: 16, 
          }}
        >
          <div>
            <h2
              style={{
                fontWeight: 800,
                fontSize: 22,
                color: "#1e293b",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: 0.5,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Admin Dashboard
            </h2>
          </div>
          {/* Input Search Project */}
          <input
            type="text"
            placeholder="Search Project"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "#fff",
              fontSize: 14,
              outline: "none",
              minWidth: 180,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              width: "100%",
              maxWidth: 260,
            }}
          />
        </div>
        {/* Card Info */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
            width: 320,
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              background: "#e0e7ff",
              color: "#2563eb",
              borderRadius: "50%",
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <img
              src="src/assets/images/User.png"
              alt="User"
              style={{ width: 36, height: 36, display: "block" }}
            />
          </div>
          <div>
            <div
              style={{
                color: "#64748b",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Total Pengguna Terdaftar
            </div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 18,
                color: "#1e293b",
              }}
            >
              {users.length} Person
            </div>
          </div>
        </div>
        {/* Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            padding: 0,
            overflow: "auto",
            marginBottom: 24,
            width: "100%",
            maxWidth: "100vw",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 5px",
              fontSize: 13,
              minWidth: 600,
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f1f5f9",
                  color: "#64748b",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                <th style={{ padding: "12px 14px", textAlign: "left" }}>
                  Nama
                </th>
                <th style={{ padding: "12px 14px", textAlign: "left" }}>
                  Email
                </th>
                <th style={{ padding: "12px 14px", textAlign: "left" }}>
                  Last Login
                </th>
                <th style={{ padding: "12px 14px", textAlign: "left" }}>
                  Tgl Lahir
                </th>
                <th style={{ padding: "12px 14px", textAlign: "left" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pagedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                pagedUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                    }}
                  >
                    <td style={{ padding: "10px 14px" }}>{user.name || ""}</td>
                    <td style={{ padding: "10px 14px" }}>{user.email}</td>
                    <td style={{ padding: "10px 14px" }}>{user.lastLogin}</td>
                    <td style={{ padding: "10px 14px" }}>{user.birthDate}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          background: "#fee2e2",
                          color: "#ef4444",
                          borderRadius: 16,
                          padding: "6px 22px",
                          fontWeight: 700,
                          fontSize: 16,
                          display: "inline-block",
                          minWidth: 70,
                          textAlign: "center",
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            marginTop: 24,
          }}
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              background: "none",
              border: "none",
              color: currentPage === 1 ? "#cbd5e1" : "#64748b",
              fontWeight: 700,
              fontSize: 14,
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            &lt; Previous
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              style={{
                background:
                  currentPage === idx + 1 ? "#2563eb" : "#e0e7ff",
                color: currentPage === idx + 1 ? "#fff" : "#2563eb",
                border: "none",
                borderRadius: 6,
                width: 32,
                height: 32,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              background: "none",
              border: "none",
              color: currentPage === totalPages ? "#cbd5e1" : "#64748b",
              fontWeight: 700,
              fontSize: 14,
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next &gt;
          </button>
        </div>
      </main>
      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .sidebar-custom {
            width: 60px !important;
            min-width: 60px !important;
            padding: 16px 0 !important;
          }
          main {
            padding: 16px 4vw 0 4vw !important;
          }
          table {
            font-size: 12px !important;
            min-width: 400px !important;
          }
          form {
            flex-direction: column !important;
            gap: 12px !important;
            align-items: stretch !important;
          }
          input, button {
            width: 100% !important;
            min-width: 0 !important;
            font-size: 13px !important;
          }
          .card-info {
            width: 100% !important;
            min-width: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .sidebar-custom {
            position: fixed !important;
            left: 0;
            top: 0;
            height: 100vh !important;
            z-index: 1100 !important;
            display: ${sidebarOpen ? "flex" : "none"} !important;
            box-shadow: 2px 0 16px rgba(0,0,0,0.12);
            background: #fff !important;
            transition: left 0.2s;
          }
          .hamburger-btn {
            display: flex !important;
          }
          main {
            padding: 8px 2vw 0 2vw !important;
          }
          table {
            font-size: 11px !important;
            min-width: 320px !important;
          }
          .card-info {
            padding: 12px 8px !important;
            font-size: 12px !important;
          }
          h2 {
            font-size: 18px !important;
          }
        }
        .sidebar-overlay {
          display: none;
        }
        @media (max-width: 600px) {
          .sidebar-overlay {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;