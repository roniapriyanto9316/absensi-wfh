import React from "react";
import { CHeader, CHeaderNav, CNavItem, CNavLink, CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // pastikan versi terbaru

export default function AppHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Ambil token dan decode
  const token = localStorage.getItem("token");
  let userPosition = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userPosition = decoded.position || ""; // pastikan backend mengirim position
    } catch (err) {
      console.error("Token invalid:", err);
    }
  }

  // Fungsi helper cek apakah admin
  const isAdmin = ["Developer", "Admin"].includes(userPosition);

  return (
    <CHeader position="sticky" className="mb-4 bg-light shadow-sm">
      <CHeaderNav className="me-auto">
        <CNavItem>
          <CNavLink href="/">Dashboard</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/myhistory">My History</CNavLink>
        </CNavItem>
        {isAdmin && (
          <>
            <CNavItem>
              <CNavLink href="/history">History (Admin)</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/adduser">Add User (Admin)</CNavLink>
            </CNavItem>
          </>
        )}
        <CNavItem>
          <CNavLink href="/profile">Profile</CNavLink>
        </CNavItem>
      </CHeaderNav>

      <CHeaderNav>
        <CButton color="danger" variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </CButton>
      </CHeaderNav>
    </CHeader>
  );
}
